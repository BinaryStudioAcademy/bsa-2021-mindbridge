import { AchievementType } from '@root/components/Achievement/Types';

export interface IAchievement{
  id: string;
  title: string;
  text: string;
  type: AchievementType;
  level: number;
}
