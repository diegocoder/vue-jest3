import { shallowMount } from '@vue/test-utils'
import MessageToggle from '@/components/MessageToggle.vue'
import Message from '@/components/Message.vue'
import MockAxios from 'axios_auth'
import flushPromises from 'flush-promises'


describe('MessageToggle.vue', () => {
  it('toggles msg passed to Message when button is clicked', () => {
    const wrapper = shallowMount(MessageToggle)
    const button = wrapper.find('#toggle-message')
    button.trigger('click')
    const MessageComponent = wrapper.find(Message)
    expect(MessageComponent.props()).toEqual({msg: 'message'})
    button.trigger('click')
    expect(MessageComponent.props()).toEqual({msg: 'toggled message'})
  })

  /* jshint ignore:start */
  it('get msg from axios call when clicked', async () => {
    // Setup
      MockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          "time":{"updated":"Dec 3, 2018 06:35:00 UTC","updatedISO":"2018-12-03T06:35:00+00:00","updateduk":"Dec 3, 2018 at 06:35 GMT"},"disclaimer":"This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org","chartName":"Bitcoin","bpi":{"USD":{"code":"USD","symbol":"&#36;","rate":"3,966.7488","description":"United States Dollar","rate_float":3966.7488},"GBP":{"code":"GBP","symbol":"&pound;","rate":"3,103.6517","description":"British Pound Sterling","rate_float":3103.6517},"EUR":{"code":"EUR","symbol":"&euro;","rate":"3,489.9019","description":"Euro","rate_float":3489.9019}}
        }
      })
    );

    // Logic-Model
    const wrapper = shallowMount(MessageToggle, {
      mocks: {
        $http: MockAxios
      }
    })

    const button = wrapper.find('#call')
    button.trigger('click')
    const MessageComponent = wrapper.find('#callMsg')
    let responseDisclaimer = 'This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org'
    await flushPromises() 

    // Asserts-Expects
    expect(MessageComponent.props()).toEqual({msg: responseDisclaimer})
  })
  /* jshint ignore:end */
})
