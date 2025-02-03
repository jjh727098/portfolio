// lenis 스크롤 부드럽게
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 800)
})

gsap.ticker.lagSmoothing(0)

// 로딩화면
const paths = document.querySelectorAll(".loading_container svg path"); 

const timeline = gsap.timeline({
  defaults: {
    duration: 0.5,
    ease: "power2.out",
  }
});

paths.forEach((path, index) => {
  timeline.fromTo(
    path,
    { opacity: 0, y: index % 2 === 0 ? -30 : 30 },
    { opacity: 1, y: 0 },
    index * 0.1
  );
});

timeline.to(paths, { opacity: 1, duration: 1 }, "+=0");

timeline.to(".loading_container", {
  y: "-100%",
  duration: .3,
  ease: "power2.inOut",
  onComplete: () => {
    $(".loading_container").css("display", "none");
  }
});

// 모바일 화면 크기 조건 (1180px 이하)
if (!window.matchMedia('(max-width: 1180px)').matches) {

// 텍스트 효과
const text = gsap.utils.toArray(".text_effect");
        
text.forEach(target => {
let SplitClient = new SplitType(target, {type: "lines, words, chars"});
let lines = SplitClient.lines;

gsap.from(lines, {
    yPercent: 100,
    autoAlpha: 0,
    duration: 1,
    stagger:.3,
    scrollTrigger: {
    trigger: target,
    start: "top bottom",
    end: "+=400",
    markers: false
    }
  });
});

}
 
// 마우스 이벤트
const cursor = $(".group_cursor");
const cursor1 = $(".cursor_more_btn");

// 커서 좌표값 할당
$(window).on('mousemove', e => {
  gsap.to(cursor, { left: e.clientX - 5, top: e.clientY - 5 });
});
$("#side_project .project_area").on("mouseenter", function () {
  cursor1.addClass("load");
});
$("#side_project .project_area").on("mouseleave", function () {
  cursor1.removeClass("load");
});
$(".project_info_box .link_thumb_project_box.cursur").on("mouseenter", function () {
  cursor1.addClass("load");
});
$(".project_info_box .link_thumb_project_box.cursur").on("mouseleave", function () {
  cursor1.removeClass("load");
});



// 프로젝트 v1 영역
gsap.set('.sc_project.v1 .group_project',{'border-radius':'2.7vw',yPercent:100,duration:2,delay:.5})
gsap.set('.sc_project.v1 .bar_area',{'width':'0vw',duration:2,delay:.5})
gsap.set('.sc_project.v1 .project_headline',{'font-size':'160px','left':'50%',duration:2,delay:.5})
gsap.set('.sc_project.v1 .project_thumb_box',{scale:0.8,yPercent:30,duration:2,delay:.5})
gsap.set('.sc_project.v1 .project_label_item',{scale:0,duration:2,delay:.5})
gsap.set('.sc_project.v1 .project_desc_area',{scale:0,duration:2,delay:.5})

const projectTl = gsap.timeline({
  scrollTrigger:{
    trigger: ".sc_project.v1",
    start: '0% 0%',
    end: '100% 100%',
    toggleClass: {
      className: "hide",
      targets: "#header"
    },
    // markers: true,
    scrub:0,
  }
})
$('.sc_project.v1 .group_project').each(function(i){
  projectTl.to(`.sc_project.v1 .group_project:nth-child(${i+1})`,{'border-radius':'0vw',yPercent:7*i,duration:2,delay:.5})
  projectTl.to(`.sc_project.v1 .group_project:nth-child(${i+1}) .bar_area`,{'width':'100vw',duration:2,delay:.5},"<")
  projectTl.to(`.sc_project.v1 .group_project:nth-child(${i+1}) .project_headline`,{'font-size':'30px','left':'0%',duration:2,delay:.5},"<")
  projectTl.to(`.sc_project.v1 .group_project:nth-child(${i+1}) .project_thumb_box`,{scale:1,yPercent:0,duration:2,delay:.5},"<")
  projectTl.to(`.sc_project.v1 .group_project:nth-child(${i+1}) .project_label_item`,{scale:1,duration:2,delay:.5},"<")
  projectTl.to(`.sc_project.v1 .group_project:nth-child(${i+1}) .project_desc_area`,{scale:1,duration:2,delay:.5},"<")
});

// 모바일 화면 크기 조건 (1180px 이하)
if (!window.matchMedia('(max-width: 1180px)').matches) {

// 프로젝트 v2 영역
gsap.set('.project_area',{autoAlpha:0 ,duration:2,delay:.5})

$('.sc_project.v2 .project_area').each(function (i, el) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: '0% 80%',
      end: '100% 10%',
      scrub: true 
      // markers: true
    },
  });

  tl.to(el, {
    autoAlpha: 1, 
    duration: 1, 
  })
    .addPause('+=0.5')
    .to(el, {
      autoAlpha: 0,
      duration: 1,
    });
});

}

// 최하단 진행바 애니메이션 
const $progressBar = $('.fix_progress_bar');
const $progressText = $('.fix_progress_bar .text');

ScrollTrigger.create({
    trigger: $(document.body),
    start: 'top top', 
    end: 'bottom bottom',
    onUpdate: (self) => {
        const progress = self.progress * 100;

        $progressBar.css('width', `${progress}%`);

        if (progress < 100) {
            $progressText.text(`${Math.round(progress)}%`);
        } else {
            $progressText.text('포트폴리오를 봐주셔서 감사합니다.');
        }
    }
});

$('.menu_btn').click(function(){
  $('.menu_area').addClass('active');
})
$('.menu_close_btn').click(function(){
  $('.menu_area').removeClass('active');
})