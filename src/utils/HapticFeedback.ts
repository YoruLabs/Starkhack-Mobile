import HapticFeedback, { HapticFeedbackTypes } from 'react-native-haptic-feedback'

export function hapticFeedback(
  type: HapticFeedbackTypes = HapticFeedbackTypes.impactLight,
  force = true,
): void {
  HapticFeedback.trigger(type, {
    enableVibrateFallback: force,
    ignoreAndroidSystemSettings: force,
  })
}
