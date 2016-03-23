import cheerio from 'cheerio';
import request from 'request';

const postForm = {
  '_xsrf': null,
  'password': '',
  'remember_me': true,
  'email': 'myxvisual@sina.com',
};

function BaseOptions(url, method, cookies, form) {
  var options = {};
  options.url = url;
  options.method = method;
  form && (options.form = form);
  cookies
  ? options.headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8;charset=utf-8',
    'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
    'Connection': 'keep-alive',
    'Host': 'www.zhihu.com',
    'User-Agent': 'Mozilla/5.0 (Macintosh; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36',
    'Referer': 'http://www.zhihu.com/',
    'Cookie':cookies
  }
  : options.headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8;charset=utf-8',
    'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Host': 'www.zhihu.com',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36',
    'Referer': 'http://www.zhihu.com/'
  };
  return options
}

request(BaseOptions('http://www.zhihu.com/question/27850529', 'GET', null, null), (err, res) => {
  const $html = cheerio.load(res.body);
  postForm._xsrf = $html('input[name="_xsrf"]').attr('value');
});

const options = {
  url: 'http://www.zhihu.com/login/email',
  method: 'POST',
  form: postForm,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Referer':'http://www.zhihu.com/'
  }
};

request(options, (err, res) => {
  err && console.log(err);
  console.log(res.body);
  var setcookie = res.headers["set-cookie"];
  request(BaseOptions('https://www.zhihu.com/people/myxvisual/collections', 'Get', setcookie), (err, res) => {
    console.log(res.body);
  });
});
