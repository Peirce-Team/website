(function () {
  'use strict';

  var NUM_POINTS  = 32;
  var SPEED       = 0.28;
  var MAX_DIST    = 260;   // ignore pairs beyond this distance

  var canvas, ctx, points = [];

  /* ---- Point ---- */
  function Point() {
    this.x  = Math.random() * canvas.width;
    this.y  = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * SPEED;
    this.vy = (Math.random() - 0.5) * SPEED;
  }

  Point.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
    this.x = Math.max(0, Math.min(canvas.width,  this.x));
    this.y = Math.max(0, Math.min(canvas.height, this.y));
  };

  /* ---- Distance helper ---- */
  function d(a, b) {
    var dx = a.x - b.x, dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /* ---- Relative Neighbourhood Graph (Urquhart 1980) ----
     Edge (p,q) exists iff no point r satisfies
     d(p,r) < d(p,q)  AND  d(q,r) < d(p,q)              */
  function rngEdges() {
    var edges = [], n = points.length;
    for (var i = 0; i < n; i++) {
      for (var j = i + 1; j < n; j++) {
        var dij = d(points[i], points[j]);
        if (dij > MAX_DIST) continue;

        var inside = false;
        for (var k = 0; k < n; k++) {
          if (k === i || k === j) continue;
          if (d(points[i], points[k]) < dij &&
              d(points[j], points[k]) < dij) { inside = true; break; }
        }
        if (!inside) edges.push([i, j, dij]);
      }
    }
    return edges;
  }

  /* ---- Render loop ---- */
  function animate() {
    ctx.fillStyle = '#f7f2e8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < points.length; i++) points[i].update();

    var edges = rngEdges();

    for (var e = 0; e < edges.length; e++) {
      var a   = points[edges[e][0]];
      var b   = points[edges[e][1]];
      var dij = edges[e][2];
      ctx.save();
      ctx.globalAlpha = (1 - dij / MAX_DIST) * 0.18 + 0.06;
      ctx.strokeStyle = '#18100a';
      ctx.lineWidth   = 0.8;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      ctx.restore();
    }

    ctx.fillStyle = '#18100a';
    for (var p = 0; p < points.length; p++) {
      ctx.save();
      ctx.globalAlpha = 0.22;
      ctx.beginPath();
      ctx.arc(points[p].x, points[p].y, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  /* ---- Init ---- */
  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function init() {
    canvas = document.getElementById('graph-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();

    for (var i = 0; i < NUM_POINTS; i++) points.push(new Point());

    window.addEventListener('resize', function () {
      resize();
      points = [];
      for (var i = 0; i < NUM_POINTS; i++) points.push(new Point());
    });

    requestAnimationFrame(animate);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
