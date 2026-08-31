import { TextInput, TextInputProps } from "react-native";

interface TextAreaProps {
  TextInputConfig?: TextInputProps;
  height?: number;
}

const TextArea = ({ TextInputConfig, height = 120 }: TextAreaProps) => {
  return (
    <TextInput
      {...TextInputConfig}
      multiline
      textAlignVertical="top"
      style={{ height }}
      className="px-4 py-4 text-gray-800 bg-gray-50 rounded-2xl border border-gray-200 font-inter"
    />
  );
};

export default TextArea;
