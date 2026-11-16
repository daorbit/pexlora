export type OptionsBarProps<T> = {
  options: T;
  onChange: (options: T) => void;
  disabled: boolean;
};
