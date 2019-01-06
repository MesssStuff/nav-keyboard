function initData() {
  let keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  let linkHash = {
    q: 'www.qq.com',
    w: 'weibo.com',
    e: 'ele.me',
    r: 'reactjs.org',
    t: 'www.tencent.com',
    y: 'youtube.com',
    u: 'ui.cn',
    i: 'iqiyi.com',
    o: 'opera.com',
    p: 'papaly.com',
    a: 'angularjs.org',
    s: 'sogou.com',
    z: 'zhihu.com',
    m: 'www.mcdonalds.com.cn',
    b: 'baidu.com',
    j: 'juejin.im',
    g: 'github.com',
    v: 'cn.vuejs.org',
    n: 'nodejs.org',
    l: 'lesscss.cn'
  };

  linkHash = getFromLocalStorage('links') || linkHash;

  return {
    keys: keys,
    linkHash: linkHash
  };
}

function generateKeyboard() {
  const data = initData();
  const keys = data.keys;
  let linkHash = data.linkHash;

  const main = document.getElementById('main');

  for (let i = 0; i < keys.length; i++) {
    let line = addTag('div');
    for (let j = 0; j < keys[i].length; j++) {
      let key = addTag('kbd');

      let text = addTag('span', {
        className: 'text',
        textContent: keys[i][j]
      });

      let btn = addTag('button', {
        textContent: 'E',
        id: keys[i][j],
        onclick: event => {
          let link = prompt('Please input new link');
          let keyName = event.target.id;
          linkHash[keyName] = link;
          localStorage.setItem('links', JSON.stringify(linkHash));
          btn.previousElementSibling.src = 'https://' + link + '/favicon.ico';
          icon.onerror = function(e) {
            e.target.src = './dot.png';
          };
        }
      });

      let icon = createIcon(linkHash[keys[i][j]]);

      key.appendChild(text);
      key.appendChild(icon);
      key.appendChild(btn);
      line.appendChild(key);
    }

    main.appendChild(line);
  }
}

function createIcon(domain) {
  let icon = addTag('img');
  if (domain) {
    icon.src = 'https://' + domain + '/favicon.ico';
  } else {
    icon.src = './dot.png';
  }
  icon.onerror = function(e) {
    e.target.src = './dot.png';
  };
  return icon;
}

function keyPressed() {
  document.body.onkeypress = function(event) {
    let linkHash = initData().linkHash;
    if (linkHash[event.key]) {
      let url = 'https://' + linkHash[event.key];
      window.open(url, '_blank');
    } else {
      alert('There is no url, please edit');
    }
  };
}

function addTag(name, attrs) {
  var ele = document.createElement(name);
  if (attrs) {
    for (let key in attrs) {
      ele[key] = attrs[key];
    }
  }
  return ele;
}

function getFromLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name) || 'null');
}

function addLoadEvent(fun) {
  var oldOnload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = fun;
  } else {
    window.onload = function() {
      oldOnload();
      fun();
    };
  }
}

addLoadEvent(generateKeyboard);
addLoadEvent(keyPressed);
