/* global jest, describe, test, expect */
import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import axios from 'axios'

import RatingButton from '../RatingButton'

jest.mock('axios', () => jest.fn())

axios.mockImplementation(() => Promise.resolve())

const getComponent = (props = {}) => shallow(<RatingButton {...props} />)
describe('RatingButton Component', () => {
  test('RatingButton should render as expected', () => {
    expect(toJson(getComponent())).toMatchSnapshot()
  })
  test('Should start with rating of 0 if no rating passed', () => {
    const component = getComponent({ id: 1, onChange: jest.fn() })
    expect(component.state().rating).toEqual(0)
  })
  test('ratingBook should appropriately rate the book', async () => {
    window.alert = jest.fn()
    const onChangeMock = jest.fn()
    const component = getComponent({ id: 1, onChange: onChangeMock })

    const data = {value: 5}
    await component.instance().ratingBook(data)

    expect(onChangeMock).toHaveBeenCalled()
  })
})
