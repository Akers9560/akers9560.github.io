/* Clock.svg v0.1 (c) 2013 Wout Fierens - Svg.js is licensed under the terms of the MIT License */
SVG.Clock = function(size, options) {
  var i, settings
  
  /* set defaults */
  settings = {
    plate:    '#FFFFFF'
  , marks:    '#4c4c4c'
  , label:    '#B1B2AF'
  , hours:    '#49b1f5'
  , minutes:  '#49b1f5'
  , seconds:  '#ee7752'
  }
  
  /* merge options */
  options = options || {}
  for (i in options)
    settings[i] = options[i]
  
  /* store full rotations */
  this.full = {
    hours:    0
  , minutes:  0
  , seconds:  0
  }
  
  /* store current time */
  this.time = {
    hours:    0
  , minutes:  0
  , seconds:  0
  }
  
  /* create nested svg element */
  this.constructor.call(this, SVG.create('svg'))
  
  /* set attributes */
  this.viewbox(0, 0, 100, 100)
  this.size(size, size)
  
  /* create base plate */
  this.plate = this.ellipse(100, 100)
    .fill(settings.plate)
  
  /* bar every five minutes */
  for (i = 11; i >= 0; i--)
    this.rect(3, 10)
      .move(48.5, 1)
      .fill(settings.marks)
      .rotate(i * 30, 50, 50)
  
  /* small bar every minute */
  for (i = 59; i >= 0; i--)
    if (i % 5 != 0)
      this.rect(1.2, 3.6)
        .move(49.4, 1)
        .fill(settings.marks)
        .rotate(i * 6, 50, 50)
  
  /* add svg.js label */
  var label = this.label = this.text('')
    .move(50, 70)
    .fill(settings.label)
    .attr('style', 'cursor:pointer;')
    .font({
      anchor: 'middle'
    , size:   6
    , family: 'Helvetcia Neue, Helvetcia, Arial' //Source Sans Pro,
    , weight: '300'
    })
    .click(function() {
      window.location.href = 'http://svgjs.com'
    })
  
  /* draw hour pointer */
  this.hours = this.rect(5,45)
    .move(47.5,15)
    .fill(settings.hours)
  
  /* draw minute pointer */
  this.minutes = this.rect(4,54)
    .move(48,4)
    .fill(settings.minutes)
  
  /* draw second pointer */
  this.seconds = this.group()
    .move(50, 50)
    .add(this.rect(1.5,50)
      .move(-0.75,-37.5)
      .fill(settings.seconds))
  
  /* set pointers without animation */
  this.update(0)
}

SVG.Clock.prototype = new SVG.Container

// Add time management methods to clock
SVG.extend(SVG.Clock, {
  // Start ticking
  start: function() {
    var self = this
    
    setInterval(function() {
      self.update()
    }, 1000)
    
    return this
  }
  // Update time
, update: function(duration) {
    /* get current time */
    var time = new Date()
    
    /* ensure duration */
    if (duration == null)
      duration = 1000
    
    /* set all pointers */
    this
      .setHours(time.getHours(), time.getMinutes())
      .setMinutes(time.getMinutes(), duration)
      .setSeconds(time.getSeconds(), duration, true)
    
    return this
  }
  // Set hour
, setHours: function(hours, minutes) {
    /* store hour */
    this.time.hours = hours
    
    /* set pointer */
    this.hours
      .rotate((360 / 12 * ((hours + minutes / 60) % 12)), 50, 50)
    
    return this
  }
  // Set minute
, setMinutes: function(minutes, duration) {
    if (minutes == this.time.minutes)
      return this
    
    /* store minutes */
    this.time.minutes = minutes
    
    /* register a full circle */
    if (minutes == 0)
      this.full.minutes++
    
    /* calculate rotation */
    var deg = this.full.minutes * 360 + 360 / 60 * minutes
    
    /* animate if duration is given */
    if (duration)
      this.minutes
        .animate(duration, SVG.easing.elastic)
        .rotate(deg, 50, 50)
    else
      this.minutes
        .rotate(deg, 50, 50)
    
    return this
  }
  // Set second
, setSeconds: function(seconds, duration, pause) {
    /* store seconds */
    this.time.seconds = seconds
    
    if (pause && seconds>=59) {
      this.full.seconds++
      seconds = 0
    } else if (pause) {
      seconds = this.time.seconds * (60/58.0)
    }

    /* calculate rotation */
    var deg = this.full.seconds * 360 + 360 / 60 * seconds
    
    /* animate if duration is given */
    if (duration)
      this.seconds
        .animate(duration, this.linear)
        .rotate(deg, 50, 50)
    else
      this.seconds
        .rotate(deg, 50, 50)
    
    return this
  }
, linear: function(pos) { return pos }
  
})

// Extend SVG container
SVG.extend(SVG.Container, {
  // Add clock method 
  clock: function(size) {
    return this.put(new SVG.Clock(size))
  }
  
})
