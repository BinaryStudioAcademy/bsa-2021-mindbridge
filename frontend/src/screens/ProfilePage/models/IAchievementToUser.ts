import { AchievementType } from '@root/components/Achievement/Types';

export interface IAchievementToUser{
  id: string;
  title: string;
  text: string;
  type: AchievementType;
  level: number;
  hasAchievement: boolean;
}
