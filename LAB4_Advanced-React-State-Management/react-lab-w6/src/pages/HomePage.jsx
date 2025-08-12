import { CustomHookTopic } from '../components/topics/CustomHookTopic';
import { ContextTopic } from '../components/topics/ContextTopic';
import { ReduxTopic } from '../components/topics/ReduxTopic';
import { PerformanceTopic } from '../components/topics/PerformanceTopic';

export function HomePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Lab Exercises: Week 6</h1>
      <p className="text-lg text-gray-600">ฝึกฝนแนวคิด React ขั้นสูงผ่านโจทย์ต่อไปนี้</p>
      <CustomHookTopic />
      <ContextTopic />
      <ReduxTopic />
      <PerformanceTopic />
    </div>
  );
}