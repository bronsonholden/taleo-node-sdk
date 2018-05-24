module.exports = {
  'all': {
    'get': true,
    'create': false,
    'delete': false
  },
  'objects': {
    'employee': {
      'get': true,
      'create': false,
      'delete': false
    },
    'packet': {
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
    },
    'packet': {
      'activity': {
        'get': true,
        'create': false,
        'delete': false
      }
    }
  }
};
