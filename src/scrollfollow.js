$(function(){

  $.fn.scrollfollow = function(op){

    var $el = $(this);

    var Conf = $.extend({
      wrapper      : $(document),
      start_margin : 0,
      stop_margin  : 0,
      anim_show    : function(el){ el.stop().fadeTo('fast', 1); },
      anim_hide    : function(el){ el.stop().fadeTo('fast', 0); },
      anim_length  : 240,
      toggle_anim  : function(frame, el){ el.css({opacity: frame / Conf.anim_length}) }
    }, op);

    var Vars = $.extend({}, {
      available_top : 0,
      now_top       : 0,
      prev_top      : 0,
      animating     : false,
      scrolling     : null,
      window_height : window.innerHeight,
    }, Conf );


    function main(e){

      // This needs window related position cause of "position:fixed"
      var st = Vars.wrapper.scrollTop();
      var t  = get_top( st, Vars.window_height );

      if( parseInt(Vars.anim_length) ){
        if( t < Vars.start_margin + Conf.anim_length ){
          toggle_anim( t - Vars.start_margin, $el );
        }else{
          $el.css({
            opacity: 1
          });
        }
      }else{
        toggle_anim( t - Vars.start_margin, $el );
      }

      if( t > Vars.available_top ){
        stop_at(Vars.available_top);
        return;
      }

      if( t > Vars.start_margin ){
        movable();
      }else if( st < Vars.start_margin ){
        stop_at(Vars.start_margin);
        return;
      }

      $el.css({
        position : "fixed",
        bottom   : Conf.bottom + "px"
      });

      Vars.now_top = t;
    }

    /**-------------------------------------------
     * Get val
     *
     */
    function get_top(current_top, window_height){
      return parseInt(current_top)
           + ( parseInt(window_height) - parseInt($el.height()) - parseInt(Conf.bottom) );
    }

    function get_available_top(){
      return (Vars.wrapper.height() - Vars.stop_margin) - $el.height();
    }


    /**------------------------------------------
     * Element's actions
     *
     */
    function toggle_anim(f){
      Conf.toggle_anim( parseInt(f), $el);
    }

    function stop_at(top){
      $el.css({
        position : "absolute",
        top      : top + "px",
        bottom   : ""
      });
    }

    function movable(){
      $el.css({
        position : "fixed",
        top      : "",
        bottom   : Conf.bottom + "px"
      });
    }

    /**-------------------------------------------
     * Inits.
     *
     */
    function init(){
      $el.css({
        "position" : "absolute",
        "top"      : Conf.start_margin + "px",
      });
    }

    /**
     * Change Vars when window size has been changed or loaded.
     *
     */
    function init_var(){
      Vars.available_top = get_available_top();
      Vars.window_height = window.innerHeight;
      var t = get_top(Conf.wrapper.scrollTop(), Vars.window_height);
      Vars.start_margin = (t > Conf.start_margin) ? (t - Conf.wrapper.scrollTop()) : Conf.start_margin;
    }

    /**
     * Force new position when window size has been changed.
     *
     */
    function init_pos(t){
      var to = get_top(t, window.innerHeight);
      console.log(to);
      (to < Vars.available_top && to > Conf.start_margin && (t != to) )
        && $el.css({ top : to + "px" });
    }


    /**--------------------------------------------
     * Events.
     *
     */
    Conf.wrapper.on('scroll', function(e){
      Vars.scrolling && (clearTimeout(Vars.scrolling));
      Vars.scrolling = setTimeout(init_var, 100);
      main(e);
    });

    $(window).on('resize', function(e){
      init_var();
      init_pos( Vars.wrapper.scrollTop() );
      main(e);
    });

    $(window).on('load', function(e){
      init();
      init_var();
      init_pos( Vars.wrapper.scrollTop() );
      setTimeout(function(){ main(e); }, 100);
    });

  }

  //$("#fix-go-top").css({
  //  opacity : 0,
  //  height  : "70px"
  //}).scrollfollow({
  //  wrapper      : $(document),  // Wrapper element as jQuery object.
  //  anim_length  : 360,          // Distance which triggers 'toggle_anim' callback.
  //  bottom       : 20,           // Distance from stop_margin.
  //  start_margin : 540,          // Margin from scrollTop:0 .
  //  stop_margin  : 200,          // Distance from wrapper's bottom.
  //  toggle_anim  : function(frame, el){ /* CALLBACK */ }
  //});
});


