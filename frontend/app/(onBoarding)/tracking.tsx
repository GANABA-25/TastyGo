import OnboardingCard from "@/src/components/onboardingCard";

export default function TrackingScreen() {
  return (
    <OnboardingCard
      imageUri="https://res.cloudinary.com/dkjlpfa1q/image/upload/v1785773760/burger3_g1igzn.jpg"
      iconType="shield-checkmark-outline"
      label="Track every step, live"
      description="Follow your courier on the map and know exactly when to open the door."
      nextUri="/login"
      step={3}
    />
  );
}
