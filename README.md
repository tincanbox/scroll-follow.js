Let some elements to follow user scrolling.

### How to use.

```javascript
$(el).scrollfollow({
  wrapper      : $(document),  // Wrapper
  anim_length  : 200,          // (px)
  bottom       : 0,            // (px) Keep this distance from bottom while following.
  start_margin : 0,            // (px)
  stop_margin  : 200,          // (px)
  toggle_anim  : function(frame, el){
                   // frame : 0 to start_margin
                   el.css({
                     opacity: (frame - 20) / 360
                   });
                 }
});


```


### Logic

```
------ 0%
  |
------ start_margin
  |
  |    (calling toggle_anim)
  |
------ anim_length
  |
  .
  .
  .
  |
------ stop_margin
  |
------ 100%
```
