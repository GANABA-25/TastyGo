import OnboardingCard from "@/src/components/onboardingCard";

export default function HotFoodScreen() {
  return (
    <OnboardingCard
      imageUri="https://res.cloudinary.com/dkjlpfa1q/image/upload/v1786720809/fastDelivery_hgfbwo.jpg"
      iconType="time-outline"
      label="Hot food in 30 minutes"
      description="Smart routing gets your rider to the door while the steam is still rising."
      nextUri="/tracking"
      step={2}
    />
  );
}
