import React from 'react';
import { mount } from 'enzyme';
import Home from './index';
import { StateContextProvider } from '../../ContextProvider';

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