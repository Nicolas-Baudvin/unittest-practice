import React from 'react';
import WorkSpace from '.';
import { mount } from 'enzyme';
import { StateContextProvider } from '../../ContextProvider';

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

beforeEach(() => {
    localStorage.setItem("udta", "username")
});
afterEach(() => {
    localStorage.clear();
})

describe("Workspace Component", () => {
    const wrapper = mount(<StateContextProvider initialValue={{}}><WorkSpace /></StateContextProvider>);
    it("should have an input", () => {
        const input = wrapper.find("input");
        expect(input).toHaveLength(1);
    });
    it("should add a task", () => {
        const form = wrapper.find("form").first();
        const input = wrapper.find("input").first();

        input.simulate('change', { target: { value: "MyTask" } });
        form.simulate('submit');

        const result = JSON.parse(localStorage.getItem('tasks'));
        expect(result[0].name).toEqual("MyTask");
    });
});