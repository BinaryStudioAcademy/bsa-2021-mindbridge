import { compose, withState, withHandlers } from 'recompose';

export default function provideValue(value) {
  return compose(
    withState('value', 'setValue', value),
    withHandlers({
      onChange: ({ setValue }) => (ev, newValue) => setValue(newValue)
    })
  );
}
