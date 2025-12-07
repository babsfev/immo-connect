// Exports Nommés (Standards)
export { Input } from "./Input";
export { Select } from "./Select";
export { Label } from "./Label";
export { ErrorMessage } from "./ErrorMessage";
export { ImageUpload } from "./ImageUpload";
export { Textarea } from "./Textarea"; // Assurez-vous que Textarea a un export { Textarea }
export { Switch } from "./Switch"; // Assurez-vous que Switch a un export { Switch }

// 👇 CORRECTION CRITIQUE : Ré-export nommé depuis un default
export { default as CurrencyInput } from "./CurrencyInput";