import moment from 'moment';
import { DietPlan } from '../types/meal';

export interface ProgressResult {
  remainingDays: number;
  completedDays: number;
  totalDays: number;
  progressPercentage: number;
}

/**
 * Calculate diet plan progress based on the start date and current date
 * @param dietPlan - The diet plan containing the meal plan array
 * @returns Progress information including completed days, remaining days, and percentage
 */
export const calculateDietPlanProgress = (
  dietPlan?: DietPlan,
  totalLength?: number
): ProgressResult => {
  if (!dietPlan?.plan || !totalLength) {
    return {
      remainingDays: 0,
      completedDays: 0,
      totalDays: totalLength ?? 0,
      progressPercentage: 0,
    };
  }

  // Sort plan dates in ascending order using moment
  const sortedPlanDates = [...dietPlan.plan].sort(
    (a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()
  );

  // Get start date (first date in the plan) normalized to start of day
  const startDate = moment(sortedPlanDates[0].date).hours(0).minutes(0).seconds(0).milliseconds(0);

  // Get today normalized to start of day for accurate comparison
  const today = moment().hours(0).minutes(0).seconds(0).milliseconds(0);

  // Calculate days elapsed since start
  const daysSinceStart = today.diff(startDate, 'days');

  // Days completed is min of elapsed days and total days, with minimum of 0
  const completedDays = Math.min(Math.max(0, daysSinceStart), totalLength);
  const remainingDays = Math.max(0, totalLength - completedDays);
  const progressPercentage = totalLength > 0 ? Math.round((completedDays / totalLength) * 100) : 0;

  return { remainingDays, completedDays, totalDays: totalLength, progressPercentage };
};
