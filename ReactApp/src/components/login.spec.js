import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Test case for testing login', () => {
    let wrapper;
    test('username check',()=> {
        wrapper = shallow(<Login/>);
        wrapper.find('input[type="text"]')
        .simulate('change',
            {target: {name: 'username', value: 'KickBill'}}
        );

        expect(wrapper.state('username')).toEqual('KickBill');
    })

    it('password check',()=> {
        wrapper = shallow(<Login/>);
        wrapper.find('input[type="password"]')
        .simulate('change', 
            {target: { name: 'password', value: 'aaa23' }}
        );

    expect(wrapper.state('password')).toEqual('aaa23');
    })

    it('login check with right data',()=> {
        wrapper = shallow(<Login/>);
        wrapper.find('input[type="text"]')
        .simulate('change', 
            { target: {name: 'username', value: 'KickBill'}}
        );

        wrapper.find('input[type="password"]')
        .simulate('change', 
            { target: {name: 'password', value: 'aaa23'}}
        );

        wrapper.find('button').simulate('click');
        expect(wrapper.state('isLogined')).toBe(true);
    })  

    it('login check with wrong data',()=> { 
        wrapper = shallow(<Login/>)
        wrapper.find('input[type="text"]')
        .simulate('change', 
            { target: {name: 'username', value: 'KickBall'}}
        );

        wrapper.find('input[type="password"]')
        .simulate('change', {target: 
            { name: 'password', value: 'bbb23'}}
        );

        wrapper.find('button').simulate('click');
        expect(wrapper.state('isLogined')).toBe(false);
    })
})