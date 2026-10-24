#!/bin/bash

set -euo pipefail

BUMP_TYPE="${1:-}"
WORKFLOWS_URL="https://expo.dev/accounts/julienizz/projects/ride-today/workflows"

# Releases are cut from a clean main in sync with origin, so the tag points to a commit on origin/main
if [[ $(git branch --show-current) != "main" ]]; then
  echo "Releases must be cut from main. Aborting."
  exit 1
fi

if [[ -n $(git status --porcelain) ]]; then
  echo "Working tree is not clean. Commit or stash your changes first. Aborting."
  exit 1
fi

git fetch --quiet --tags origin main

if [[ $(git rev-parse HEAD) != $(git rev-parse origin/main) ]]; then
  echo "Local main is not in sync with origin/main. Pull or push first. Aborting."
  exit 1
fi

CURRENT_VERSION=$(cat config/APP_VERSION)
RUNTIME_VERSION=$(cat config/RUNTIME_VERSION)
LAST_TAG=$(git describe --tags --abbrev=0 --match "v*" 2>/dev/null || true)

if [[ -n "$LAST_TAG" ]]; then
  CHANGELOG=$(git log --oneline --no-merges "$LAST_TAG"..HEAD)

  if [[ -z "$CHANGELOG" ]]; then
    echo "Nothing to release since $LAST_TAG. Aborting."
    exit 1
  fi
else
  CHANGELOG=$(git log --oneline --no-merges)
fi

# Parse current version
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"

if [[ -z "$BUMP_TYPE" ]]; then
  echo ""
  echo "Current version: $CURRENT_VERSION"
  echo ""
  echo "What type of release is this?"
  echo "  1) patch  - Bug fixes ($CURRENT_VERSION → $MAJOR.$MINOR.$((PATCH + 1)))"
  echo "  2) minor  - New features ($CURRENT_VERSION → $MAJOR.$((MINOR + 1)).0)"
  echo "  3) major  - Breaking changes ($CURRENT_VERSION → $((MAJOR + 1)).0.0)"
  echo ""
  read -p "Enter choice [1/2/3]: " -n 1 -r CHOICE
  echo ""

  case "$CHOICE" in
    1) BUMP_TYPE="patch" ;;
    2) BUMP_TYPE="minor" ;;
    3) BUMP_TYPE="major" ;;
    *) BUMP_TYPE="invalid" ;;
  esac
fi

case "$BUMP_TYPE" in
  patch)
    PATCH=$((PATCH + 1))
    ;;
  minor)
    MINOR=$((MINOR + 1))
    PATCH=0
    ;;
  major)
    MAJOR=$((MAJOR + 1))
    MINOR=0
    PATCH=0
    ;;
  *)
    echo "Invalid release type: $BUMP_TYPE"
    echo "Usage: yarn release [patch|minor|major]"
    exit 1
    ;;
esac

APP_VERSION="$MAJOR.$MINOR.$PATCH"
NEW_RUNTIME_VERSION=$((RUNTIME_VERSION + 1))
TAG="v$APP_VERSION"

if git rev-parse --quiet --verify "refs/tags/$TAG" > /dev/null; then
  echo "Tag $TAG already exists. Aborting."
  exit 1
fi

echo ""
echo "=========================================="
echo "  RELEASE $TAG"
echo "=========================================="
echo ""
echo "Changes since ${LAST_TAG:-the first commit}:"
echo ""
echo "$CHANGELOG" | sed 's/^/  /'
echo ""
echo "The following actions will be performed:"
echo ""
echo "  1. Run tests"
echo "  2. Bump config/APP_VERSION ($CURRENT_VERSION → $APP_VERSION)"
echo "     and config/RUNTIME_VERSION ($RUNTIME_VERSION → $NEW_RUNTIME_VERSION)"
echo "  3. Commit: 'chore: bump to $TAG (runtime $NEW_RUNTIME_VERSION)'"
echo "  4. Create git tag: $TAG"
echo "  5. Push main and $TAG to origin"
echo ""
echo "Pushing the tag starts the EAS Release workflow,"
echo "which builds and submits both apps to the stores."
echo ""
echo "=========================================="
echo ""

read -p "Do you want to proceed? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Release cancelled."
  exit 0
fi

echo ""

yarn test

echo "$APP_VERSION" > config/APP_VERSION
printf "%s" "$NEW_RUNTIME_VERSION" > config/RUNTIME_VERSION

git add config/APP_VERSION config/RUNTIME_VERSION
git commit -m "chore: bump to $TAG (runtime $NEW_RUNTIME_VERSION)"
git tag -a "$TAG" -m "Release $TAG" -m "$CHANGELOG"
git push --atomic origin main "$TAG"

echo ""
echo "Released $TAG. Follow the store builds at:"
echo "  $WORKFLOWS_URL"
