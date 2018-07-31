import enLocaleData from 'react-intl/locale-data/en';

export default {
  locale: enLocaleData,
  messages: {
    foo: {
      default: 'foo',
      bar: {
        default: 'bar',
        full: 'foobar',
      },
    },
    test: {
      default: 'toto {test}',
    },
  },
};
