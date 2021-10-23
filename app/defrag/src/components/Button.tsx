interface Props {
  children: React.ReactNode;
  disabled: boolean;
  onClick?: () => void;
}

const Button = ({ disabled, children, onClick }: Props) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
