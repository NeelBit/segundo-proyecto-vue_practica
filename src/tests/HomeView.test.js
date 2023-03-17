import {
    mount
} from '@vue/test-utils'

import {
    computed
} from 'vue';

import {
    test,
    vi,
    describe,
    expect
} from 'vitest';

import HomeView from '../views/HomeView.vue'

import * as todosSetup from '../to_do_setup'

const setupMock = {
    todosIncompleted: computed(() => []),
    todosCompleted: computed(() => []),
    toggle: vi.fn(),
    deleteTodo: vi.fn(),
    add: vi.fn(),
};

describe('HelloView.vue tests', () => {
    test('Title exists', () => {
        const wrapper = mount(HomeView);

        expect(wrapper.text()).toContain('TO-DO LIST:');
    });

    test('List is empty', () => {
        const spy = vi.spyOn(todosSetup, 'todosFactory').mockReturnValue({
            ...setupMock
        });
        const wrapper = mount(HomeView);

        expect(wrapper.text()).toContain('TO-DO LIST:');
        expect(wrapper.text()).toContain('Nada por hacer :D');
    });

    test('List has incompleted todos', () => {
        const spy = vi.spyOn(todosSetup, 'todosFactory').mockReturnValue({
            ...setupMock,
            todosIncompleted: computed(() => [{
                id: 1,
                name: 'Learn Vue3',
                completed: false
            }]),
        });

        const wrapper = mount(HomeView);

        expect(wrapper.text()).not.toContain('Nada por hacer :D');

        const uls = wrapper.findAll('ul');
        expect(uls[0].attributes().id).toContain('incomplete-tasks');
        expect(uls[0].text()).toContain('Learn Vue3');

        expect(uls[1].attributes().id).toContain('completed-tasks');
        expect(uls[1].text()).toBe('');
    });

    test('List has completed todos', () => {
        const spy = vi.spyOn(todosSetup, 'todosFactory').mockReturnValue({
            ...setupMock,
            todosCompleted: computed(() => [{
                id: 1,
                name: 'Learn AWS',
                completed: true
            }]),
        });

        const wrapper = mount(HomeView);
        expect(wrapper.text()).toContain('Nada por hacer :D');

        const uls = wrapper.findAll('ul');
        expect(uls[0].attributes().id).toContain('incomplete-tasks');
        expect(uls[0].text()).toBe('');

        expect(uls[1].attributes().id).toContain('completed-tasks');
        expect(uls[1].text()).toContain('Learn AWS');
    });

    test('Toggle works', async () => {
        const mock = {
            ...setupMock,
            todosIncompleted: computed(() => [{
                id: 1,
                name: 'Learn AWS',
                completed: true
            }]),
        };

        /* Los espias son objetos que nos permiten monitorear el comportamiento de otros,
         */
        const toggleSpy = vi.spyOn(mock, 'toggle');
        const spy = vi.spyOn(todosSetup, 'todosFactory');
        spy.mockReturnValue(mock);

        const wrapper = mount(HomeView);

        expect(wrapper.text()).not.toContain('Nada por hacer :D');

        const uls = wrapper.findAll('ul');
        expect(uls[0].attributes().id).toContain('incomplete-tasks');
        expect(uls[0].text()).toContain('Learn AWS');

        expect(uls[1].attributes().id).toContain('completed-tasks');
        expect(uls[1].text()).toBe('');

        await wrapper.find('input').trigger('click');

        expect(toggleSpy).toHaveBeenCalled();
    });
});