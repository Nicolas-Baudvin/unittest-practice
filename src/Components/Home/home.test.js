import React from 'react';
import { shallow, mount } from 'enzyme';
import Home from './index';
import { useStateContext, StateContextProvider } from '../../ContextProvider';
import { renderHook } from '@testing-library/react-hooks'

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

describe("Home Component", () => {
    const wrapper = mount(<StateContextProvider initialValue={{}}><Home /></StateContextProvider>);
    it("should render a form", () => {

        const form = wrapper.find('form');
        expect(form).toHaveLength(1)
    });
    it("should add username to context state", () => {
        const form = wrapper.find('form').first();
        const input = wrapper.find('input').first();
        input.simulate('change', { target: { value: 'username' } });
        
        form.simulate('submit');
        expect(localStorage.getItem('udta')).toEqual('username')
    });
});