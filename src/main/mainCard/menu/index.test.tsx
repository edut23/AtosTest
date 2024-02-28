import { render, fireEvent, renderHook } from '@testing-library/react';
import Menu from ".";
import useMain from '../../../hook/useMain';

describe('Menu Component', () => {

    const setPage = renderHook(() => useMain().setPage);

    const { getByText } = render(<Menu setPage={setPage.rerender} />);
})