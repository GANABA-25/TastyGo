import Button from "@/src/components/button";
import { useCart } from "@/src/store/cartContext";
import { Minus, Plus, Trash } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  return (
    <View className="gap-4 p-4">
      <View className="gap-4">
        {cart.items.map((item) => (
          <View
            key={item.id}
            className="flex-row gap-4 items-center p-4 bg-white rounded-2xl border border-gray-200 elevation-sm"
          >
            <Image
              source={{
                uri: item.image,
              }}
              className="w-24 h-24 rounded-2xl"
              resizeMode="cover"
            />

            <View className="flex-1 gap-2 min-w-0">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-inter-bold">{item.name}</Text>
                <Pressable onPress={() => removeFromCart(item.id)}>
                  <Trash size={20} color="red" />
                </Pressable>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-primary font-inter-bold">
                  ${Number(item.totalPrice).toFixed(2)}
                </Text>

                <View className="flex-row gap-4 items-center px-6 py-2 bg-gray-100 rounded-full">
                  <Pressable onPress={() => decreaseQuantity(item.id)}>
                    <Minus size={20} strokeWidth={2.5} />
                  </Pressable>

                  <Text className="text-xl font-inter-bold">
                    {item.quantity}
                  </Text>

                  <Pressable onPress={() => increaseQuantity(item.id)}>
                    <Plus size={20} strokeWidth={2.5} />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View className="gap-4 p-4 bg-white rounded-2xl border border-gray-200">
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-500 font-inter">Subtotal</Text>
          <Text>${cart.subTotal.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-500 font-inter">Delivery</Text>
          <Text>${cart.deliveryFee.toFixed(2)}</Text>
        </View>

        <View className="flex-row justify-between items-center p-4 border-t border-gray-200">
          <Text className="font-inter-bold">Total</Text>
          <Text>${cart.total.toFixed(2)}</Text>
        </View>
      </View>

      <Button label="Go to checkout" />
    </View>
  );
};

export default Cart;
