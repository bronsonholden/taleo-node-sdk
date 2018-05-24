module.exports = {
  'global': {
    'get': true,
    'create': false,
    'delete': false
  },
  'objects': {
    'employee': {
      'get': true,
      'create': false,
      'delete': false
    }
  },
  'relationships': {
    'employee': {
      'attachment': {
        'get': true,
        'create': false,
        'delete': false
      },
      'packet': {
        'get': true,
        'create': false,
        'delete': false
      }
    }
  }
};
