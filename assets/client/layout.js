const layout = function(content){
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>App Anglais</title><link rel="stylesheet" href="/styles/bootstrap.min.css"><link rel="stylesheet" href="/client/index.css"></head><body><div id="root">${content}</div><script src="/js/jquery.min.js"></script><script src="/client/dist/client.js"></script></body></html>`;
};

export default layout; 