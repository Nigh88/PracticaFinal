import React from 'react';
import { mount } from 'enzyme';
import Login from './Login';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

///////////////////////////////
//The third part of the test dont work cause the function is async.
//////////////////////////////



configure({ adapter: new Adapter() });
describe('Test case for testing login', () => {
    let wrapper;
    test('username check',()=> {
        wrapper = mount(<Login.WrappedComponent/>);
        wrapper.find('input[type="text"]')
        .simulate('change',
            {target: {name: 'username', value: 'egg@example.com'}}
        );

        expect(wrapper.state('username')).toEqual('egg@example.com');
    })

    it('password check',()=> {
        wrapper = mount(<Login.WrappedComponent/>);
        wrapper.find('input[type="password"]')
        .simulate('change', 
            {target: { name: 'password', value: '091fi' }}
        );

    expect(wrapper.state('password')).toEqual('091fi');
    })

    it('login check with right data',async ()=> {
        wrapper = mount(<Login.WrappedComponent/>);
        wrapper.find('input[type="text"]')
        .simulate('change', 
            { target: {name: 'username', value: 'egg@example.com'}}
        );

        wrapper.find('input[type="password"]')
        .simulate('change', 
            { target: {name: 'password', value: '091fi'}}
        );

        await wrapper.find('button').simulate('click');
        expect(wrapper.state('isLogged')).toBe(true);
    })  

    it('login check with wrong data',()=> { 
        wrapper = mount(<Login.WrappedComponent/>)
        wrapper.find('input[type="text"]')
        .simulate('change', 
            { target: {name: 'username', value: 'foot@example.com'}}
        );

        wrapper.find('input[type="password"]')
        .simulate('change', {target: 
            { name: 'password', value: 'bbb23'}}
        );

        wrapper.find('button').simulate('click');
        expect(wrapper.state('isLogged')).toBe(false);
    })
})