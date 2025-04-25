import { Button } from '@/Components/ui/button';

type MyButtonProps = {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
};
export const CustomButton = ({ children, ...props }: MyButtonProps) => {
  return <Button {...props}>{children}</Button>;
};
