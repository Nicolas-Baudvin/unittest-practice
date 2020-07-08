import React from 'react';
import Tasks from '.';
import { mount } from 'enzyme';
import { StateContextProvider } from '../../../ContextProvider';

beforeEach(() => {
    localStorage.setItem("tasks", JSON.stringify([{
        name: "MyTask",
        isChecked: false,
        _id: JSON.parse(localStorage.getItem("tasks")) ? JSON.parse(localStorage.getItem("tasks")).length : 0
    }]))
});

afterEach(() => {
    localStorage.clear();
});

describe("Tasks Component", () => {

    const wrapper = mount(
        <StateContextProvider initialValue={{ username: "username", tasks: [{name: "MyTask", isChecked: false, _id: 0}] }}>
            <Tasks />
        </StateContextProvider>
    );

    it("should render tasks without crashing", () => {
        const tasks = wrapper.find('div').first();
        expect(tasks).toHaveLength(1)
    });
    it("should have a 'MyTask' task", () => {
        const task = wrapper.find('p').first();
        expect(task.text()).toEqual(" MyTask ");
    });
    it("should check the task clicked", () => {
        const check = wrapper.find("input").last();
        const task = wrapper.find("div").last();
        task.simulate('click');
        expect(check.prop("checked")).toEqual(true)
    });
});