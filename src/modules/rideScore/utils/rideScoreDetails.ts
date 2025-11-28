import { useTheme } from "@emotion/react";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import type { ConditionNotation } from "#modules/weather/types/weather.types";

export const useRideScoreDetails = () => {
  const theme = useTheme();
  const { _ } = useLingui();

  const rideScoreDetails = {
    0: {
      color: theme.colors.rideScore[0],
      catchPhrase: _(msg`Very risky. Ride only if absolutely necessary.`),
      description: _(
        msg`The weather is extremely bad (blizzard, heavy snow, etc.) and/or temperature is very low (or very high). It would be very dangerous to go out and ride in such conditions, we strongly advise against it.`,
      ),
    },
    1: {
      color: theme.colors.rideScore[1],
      catchPhrase: _(msg`Severely hazardous, better to stay off the road.`),
      description: _(
        msg`The weather is very bad (snow, heavy rain) and/or temperature is very low (or very high). Going out and riding in such conditions is very risky.`,
      ),
    },
    2: {
      color: theme.colors.rideScore[2],
      catchPhrase: _(msg`Challenging conditions, stay sharp and be prepared.`),
      description: _(
        msg`The weather is average or below average, temperature is okay-ish. Riding is not recommended but if you must, be very careful. The ride will probably not be very enjoyable.`,
      ),
    },
    3: {
      color: theme.colors.rideScore[3],
      catchPhrase: _(msg`Manageable, ride carefully and watch for trouble.`),
      description: _(
        msg`The weather is average (light rain for example), temperature is okay. Riding is possible but you should be careful. The ride might be a bit challenging but it should be okay if you're careful.`,
      ),
    },
    4: {
      color: theme.colors.rideScore[4],
      catchPhrase: _(
        msg`Favorable weather. Expect a decent, comfortable ride.`,
      ),
      description: _(
        msg`The weather is good (no rain or challenging conditions), temperature is comfortable. It's a good day to go out and ride, you should have a good time.`,
      ),
    },
    5: {
      color: theme.colors.rideScore[5],
      catchPhrase: _(msg`Ideal condition ! Hit the road and enjoy!`),
      description: _(
        msg`The weather conditions are excellent (clear sky or simply cloudy), the temperature as well, and the time of the day is perfect for riding. It's the perfect day to go out and ride!`,
      ),
    },
  } satisfies Record<
    ConditionNotation,
    { color: string | undefined; catchPhrase: string; description: string }
  >;

  return rideScoreDetails;
};
