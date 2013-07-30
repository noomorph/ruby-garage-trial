basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'app/lib/underscore/underscore.js',
  'app/lib/jquery/jquery*.js',
  'app/lib/jquery.ui/jq*ui*min.js',
  'app/lib/angular/angular.js',
  'app/lib/angular.ui/sortable.js',
  'app/lib/angular/angular-*.js',
  'test/lib/angular/angular-mocks.js',
  'app/js/**/*.js',
  'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
