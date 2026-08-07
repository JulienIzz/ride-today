// @ts-check

/**
 * Chains two resolvers that would otherwise clobber each other:
 * - react-native-worklets: redirects worklets imports to their non-native (JS)
 *   implementations so reanimated can run in Jest
 * - @react-native/jest-preset: the resolver jest-expo's preset normally sets
 */
const workletsResolver = require("react-native-worklets/jest/resolver.js");
const reactNativeResolver = require("@react-native/jest-preset/jest/resolver.js");

/** @type {import('jest-resolve').SyncResolver} */
module.exports = (request, options) =>
  workletsResolver(request, {
    ...options,
    defaultResolver: (req, opts) =>
      reactNativeResolver(req, {
        ...opts,
        defaultResolver: options.defaultResolver,
      }),
  });
