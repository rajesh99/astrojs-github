 function main () {
    var slider2 = new Slider(document.querySelector('#slider-2'),{
        items : 4,
          responsive : true,
          mobile : {
              items : 1
          },
          tablet : {
              width : 992,
              items : 5
          },
          desktop : {
              width : 1300,
              items : 6
          },
          deviceChanged : function(e){
              console.log(e);
          },
          navChanged : function (e){
              console.log(e);
          }
      })
    
    var slider4 = new Slider(document.querySelector('#slider-4'),{
        items : 4,
          responsive : true,
          mobile : {
              items : 1
          },
          tablet : {
              width : 992,
              items : 3
          },
          desktop : {
              width : 992,
              items : 4
          },
          deviceChanged : function(e){
              console.log(e);
          },
          navChanged : function (e){
              console.log(e);
          }
      })
    }

    document.addEventListener('DOMContentLoaded', main);


    var extend = function(source, target) {

  if (typeof source == 'object') {
    for (var property in source) {
      if (!target[property]) {
        target[property] = source[property];
      }
    }
  }
  return target;
}

function Slider(el, options) {

  var self = this,
    slide_container,
    slides,
    prev_button,
    next_button,
    slider_nav,
    current_nav,
    steps,
    current_step,
    item_per_step,
    play_timer,
    resize_timer,
    windowState,
    listeners = [];

  var defaults = {
    autoplay: false,
    interval: 4000,
    createNav: true,
    items: 1,
    responsive: false,
    mobile: {
      items: 2
    },
    tablet: {
      width: 600,
      items: 3
    },
    desktop: {
      width: 968,
      items: 4
    },
    maxHeight: undefined,
    deviceChanged: undefined,
    navchanged: undefined
  };

  function wrap(element, start, end) {
    var html = start + element.outerHTML + end;
    element.outerHTML = html;
  }

  function create_nav() {
    slider_nav = document.createElement('ul');
    slider_nav.classList.add('slider__nav');
    create_nav_links();
    el.appendChild(slider_nav);
  }

  function update_nav() {
    var links_count = slider_nav.querySelectorAll('li').length;
    if (links_count !== steps) {
      slider_nav.innerHTML = '';
      create_nav_links();
      raiseEvent({
        type: 'navchanged',
        currentStep: current_step,
        itemPerStep: item_per_step,
        steps: steps
      });
    }
  }

  function getIndex(element) {
    var nodes = element.parentNode.childNodes;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i] == element) {
        return i;
      }
    }
    return -1;
  }

  function create_nav_links() {
    for (var i = 0; i < steps; i++) {
      var li = document.createElement('li');
      var nav_link = document.createElement('a');
      nav_link.setAttribute('href', '#');

      nav_link.addEventListener('click', function(e) {
        e.preventDefault();

        var index = getIndex(this.parentElement);
        moveTo(index);

      });
      li.appendChild(nav_link);
      slider_nav.appendChild(li);
    }
  }

  function get_current_left_slides() {

    if (current_step == 0) {
      return 0;
    } else if (current_step == steps - 1) {
      var previous_step_slide_total = (current_step - 1) * item_per_step, // 8
        slides_left = (slides.length - current_step * item_per_step), // 1
        result = previous_step_slide_total + slides_left; // --> 9

      return result;
    } else {
      var result = current_step * item_per_step;
      return result;
    }
  }

  function get_slides_to_move(step) {

    // back
    if (step < current_step) {

      if (step == steps - 2) {
        // ex slides.length  = 13 | steps 4 | step 2
        var slide_total = slides.length, // 13
          slides_left = (slides.length - step * item_per_step), // 1
          slides_to_move = slide_total - slides_left; // --> 12 

        return slides_to_move;
      } else {
        return step * item_per_step;
      }

    }
    // forward
    if (step > current_step) {

      if (step == steps - 1) {
        // ex slides.length  = 13 | steps 4 | step 3
        var previous_step_slide_total = (step - 1) * item_per_step, // 8
          slides_left = (slides.length - step * item_per_step), // 1
          slides_to_move = previous_step_slide_total + slides_left; // --> 9

        return slides_to_move;
      } else {
        return step * item_per_step;
      }

    }

    return 0;
  }

  function onResize() {
    if (options.autoplay) {
      pause();
      clearTimeout(resize_timer);
      resize_timer = setTimeout(function() {
        play();
      }, 250);
    }

    // repositionne les slides sans animation
    var percentage = 100 / item_per_step,
      x = item_per_step > 1 ?
      percentage * get_current_left_slides() :
      current_step * percentage;

    slide_container.style.transition = 'none';
    slide_container.style.transform = 'translateX(-' + x + '%)';
    update_nav();
    update_buttons();
    setTimeout(function() {
      slide_container.style.removeProperty('transition');
    }, 500);

    if (window.innerWidth < options.tablet.width) {
      if (windowState != 'mobile') {
        windowState = 'mobile';
        if (options.responsive) setItems(options.mobile.items);
        raiseEvent({
          type: 'devicechanged',
          device: 'mobile'
        });
      }
    } else if (window.innerWidth < options.desktop.width) {
      if (windowState != 'tablet') {
        windowState = 'tablet';
        if (options.responsive) setItems(options.tablet.items);
        raiseEvent({
          type: 'devicechanged',
          device: 'tablet'
        });
      }
    } else if (window.innerWidth > options.desktop.width) {
      if (windowState != 'desktop') {
        windowState = 'desktop';
        if (options.responsive) setItems(options.desktop.items);
        raiseEvent({
          type: 'devicechanged',
          device: 'desktop'
        });
      }
    }
  }

  function onPlay(e) {
    play();
  }

  function onPause(e) {
    pause();
  }

  function update_buttons() {

    if (prev_button) {
      if (current_step <= 0) {
        prev_button.classList.add('hidden');
      } else {
        prev_button.classList.remove('hidden');
      }
    }

    if (next_button) {
      if (current_step >= steps - 1) {
        next_button.classList.add('hidden');
      } else {
        next_button.classList.remove('hidden');
      }
    }

    // navs
    if (options.createNav) {
      var current_nav = slider_nav.querySelectorAll('a')[current_step];
      var active = slider_nav.querySelector('a.active');
      if (active) {
        active.classList.remove('active');
      }
      current_nav.classList.add('active');
    }
  }

  function raiseEvent(event) {
    if (typeof event == 'string') event = {
      type: event
    };
    if (!event.target) event.target = this;
    if (!event.type) throw new Error("Event object missing 'type' property.");

    if (listeners[event.type] instanceof Array) {
      var _listeners = listeners[event.type];
      for (var i = 0; i < _listeners.length; i++) {
        _listeners[i].call(self, event);
      }
    }
  }

  function init() {

    if (!el) throw new Error("'El' cannot be null");

    options = extend(defaults, options || {});

    wrap(el.querySelector('.slider__slides'), '<div class="slider__viewport">', '</div>');

    slide_container = el.querySelector('.slider__slides');

    slides = el.querySelectorAll('.slider__slide');

    prev_button = el.querySelector('.slider__button--prev');
    next_button = el.querySelector('.slider__button--next');

    if (options.maxHeight) {
      slide_container.style.maxHeight = options.maxHeight + 'px';
    }

    if (options.deviceChanged) {
      addListener('devicechanged', options.deviceChanged);
    }

    if (options.navChanged) {
      addListener('navchanged', options.navChanged);
    }

    current_step = 0;

    if (options.responsive) {
      if (window.innerWidth < options.tablet.width) {
        setItems(options.mobile.items);
      } else if (window.innerWidth < options.desktop.width) {
        setItems(options.tablet.items);
      } else if (window.innerWidth > options.desktop.width) {
        setItems(options.desktop.items);
      }
    } else {
      setItems(options.items);
    }

    if (options.createNav) {
      create_nav();
    }

    // events
    window.addEventListener('resize', function() {
      onResize();
    });

    if (prev_button) {
      prev_button.addEventListener('click', function(e) {
        e.preventDefault();
        moveBack();
      });
    }

    if (next_button) {
      next_button.addEventListener('click', function(e) {
        e.preventDefault();
        moveForward();
      });
    }

    //
    //        onResize();
    update_buttons();
    if (options.autoplay) {

      el.addEventListener('mouseover', onPause);
      el.addEventListener('mouseleave', onPlay);

      play();
    }
  }

  function addListener(type, listener) {
    if (typeof listeners[type] == "undefined") {
      listeners[type] = [];
    }
    listeners[type].push(listener);
  }

  function play() {
    clearInterval(play_timer);
    play_timer = setInterval(function() {
      if (current_step == steps - 1) {
        moveTo(0);
      } else {
        moveForward();
      }
    }, options.interval);
  }

  function pause() {
    clearInterval(play_timer);
  }

  function stop() {
    el.removeEventListener('mouseover', onPause);
    el.removeEventListener('mouseleave', onPlay);

    clearInterval(play_timer);
  }

  function moveBack() {
    if (current_step <= 0) return false;

    moveTo(current_step - 1);
  }

  function moveForward() {
    if (current_step >= steps - 1) return false;

    moveTo(current_step + 1);
  }

  function setItems(count) {

    item_per_step = count;
    steps = Math.ceil(slides.length / item_per_step);

    if (item_per_step > 1) {
      var slide_width = 100 / item_per_step;
      for (var i = 0; i < slides.length; i++) {
        var slide = slides[i];
        if (slide) {
          slide.style.width = slide_width + '%';
        }
      }
    } else {
      for (var i = 0; i < slides.length; i++) {
        var slide = slides[i];
        if (slide) {
          slide.style.removeProperty('width');
        }
      }
    }

    // repositionne les slides sans animation
    var percentage = 100 / item_per_step,
      x = item_per_step > 1 ?
      percentage * get_current_left_slides() :
      current_step * percentage;

    slide_container.style.transition = 'none';
    slide_container.style.transform = 'translateX(-' + x + '%)';
    setTimeout(function() {
      slide_container.style.removeProperty('transition');
    }, 500);
  }

  /**
   * déplacer le container soit en avant soit en arrière, si step == current step on ne fait rien
   * translateX supérieur au précédent (positif ou non) > vers droite
   * translateX inférieur au précédent (négatif ou non) < vers gauche
   * prendre en compte la bordure et la marge (offsetWidth)
   * @param   string step 
   */
  function moveTo(step) {
    if (step < 0 || step > steps - 1) return false;

    var percentage = 100 / item_per_step,
      x = item_per_step > 1 ?
      percentage * get_slides_to_move(step) :
      step * percentage;

    slide_container.style.transform = 'translateX(-' + x + '%)';
    current_step = step;

    update_buttons();
  }

  init();

  return {
    addEventListener: addEventListener,
    moveBack: moveBack,
    moveForward: moveForward,
    moveTo: moveTo,
    pause: pause,
    play: play,
    setItems: setItems
  }
}