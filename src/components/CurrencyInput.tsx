import React, { forwardRef } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface CurrencyInputProps extends Omit<NumericFormatProps, 'onValueChange'> {
  onValueChange?: (value: string | undefined) => void;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ onValueChange, ...props }, ref) => {
    return (
      <NumericFormat
        getInputRef={ref}
        decimalSeparator=","
        thousandSeparator="."
        prefix=""
        fixedDecimalScale
        decimalScale={2}
        allowNegative={false}
        onValueChange={(values) => {
          if (onValueChange) {
            onValueChange(values.value);
          }
        }}
        {...props}
      />
    );
  }
);

export default CurrencyInput;
