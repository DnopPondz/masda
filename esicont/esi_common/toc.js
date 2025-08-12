(function(){
  function bind(root){
    root.querySelectorAll('li.kid').forEach(function(li){
      if(li.dataset.bound) return;
      li.dataset.bound = '1';
      var img = li.querySelector('img');
      var link = li.querySelector('a');
      var sub = li.nextElementSibling;
      var url = link.getAttribute('href');
      function toggle(e){
        e.preventDefault();
        if(li.classList.contains('open')){
          li.classList.remove('open');
          if(sub){
            sub.innerHTML = '';
            sub.style.display = 'none';
          }
          if(img && img.src) img.src = img.src.replace('minus2.png','plus2.png');
        }else{
          fetch(url).then(function(r){return r.text();}).then(function(html){
            var parser = new DOMParser();
            var doc = parser.parseFromString(html,'text/html');
            var chunk = doc.querySelector('#chunk');
            if(chunk && sub){
              sub.innerHTML = chunk.innerHTML;
              sub.style.display = 'block';
              bind(sub);
            }
            if(img && img.src) img.src = img.src.replace('plus2.png','minus2.png');
            li.classList.add('open');
          }).catch(function(){ });
        }
      }
      if(img) img.addEventListener('click', toggle);
      if(link) link.addEventListener('click', toggle);
    });
  }
  document.addEventListener('DOMContentLoaded', function(){ bind(document); });
  window.loadFrame = function(){};
})();
