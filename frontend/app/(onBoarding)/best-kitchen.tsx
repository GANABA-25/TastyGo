import OnboardingCard from "@/src/components/onboardingCard";

export default function BestKitchenScreen() {
  return (
    <OnboardingCard
      imageUri="https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773761/burger4_wuiarl.jpg"
      iconType="location-outline"
      label="The best kitchens, curated"
      description="We hand-pick every restaurant on QuickBite so each order feels like a night out."
      nextUri="/hot-food"
      step={1}
    />
  );
}
