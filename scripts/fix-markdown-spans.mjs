/**
 * One-off cleanup for the "unbalanced markdown" spans flagged during the blog
 * import batch. Each entry replaces one flagged span with correctly-split
 * spans (proper bold/italic marks instead of literal asterisks).
 *
 * Root causes found:
 *  - "**Label:**text" — CommonMark won't close `**` when it's preceded by
 *    punctuation (the colon) and followed by a letter with no space.
 *  - "word**.**" — a lone punctuation mark got bolded/italicized by itself
 *    (Google Docs over/under-selection); stripped entirely.
 *  - "word*, phrase*." — the emphasis markers wrap a leading comma that
 *    should sit outside the emphasis; comma moved out.
 *  - A couple of one-off marker placements fixed by hand after reading
 *    the source doc's intent.
 */
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const rk = () => Math.random().toString(36).slice(2)
const span = (text, marks = []) => ({ _key: rk(), _type: 'span', text, marks })

// fix: (docId, blockIndex, spanIndex, oldTextExact, newSpans[])
const fixes = [
  ['conv-ep-003-navigating-finances-with-wholeness-in-mind-w-demi-osunsina', 30, 1,
    "’ First of all, you’ve got this. If God has placed a vision in you or even if you don’t know if it’s God and it’s something you really want to do, you can. Be very hardworking and always know your ‘why’. Your why will determine why you’re doing it. If your why is a viable reason you will run after that goal and nothing will stop you. You may have things that will cut you off or distract you but keep going. Make sure you spend a lot of time knowing why you want to develop that business or why you want to go into property**.**",
    [span(": First of all, you’ve got this. If God has placed a vision in you or even if you don’t know if it’s God and it’s something you really want to do, you can. Be very hardworking and always know your ‘why’. Your why will determine why you’re doing it. If your why is a viable reason you will run after that goal and nothing will stop you. You may have things that will cut you off or distract you but keep going. Make sure you spend a lot of time knowing why you want to develop that business or why you want to go into property.")]],

  ['conv-ep-006-breaking-into-the-finance-industry-and-trusting-the-process-pt-2-w-karis-onyemenam', 1, 1, null,
    [span(" I understand that not everyone who is listening to this may be a Christian and I think that's completely fine. We as a generation have this notion where we want to arrive or we don't want to go through the necessary process. You want to get your career started and by the time you're 22, you already feel like you're behind. I'm going back to the spiritual aspect. I know for a fact, when I did that experience that was for free–I know the kind of person I was the year before. I wouldn't have had the humility to do that. When you go through that period where you have to be persistent it really breeds your why because nobody is going to be persistent for something they don't want. One of my cousins wanted to be a dentist. She didn't get into Dentistry in her undergrad. She tried again, and she didn't get insurance going into another Master's. But she eventually got in.")]],

  ['conv-ep-006-breaking-into-the-finance-industry-and-trusting-the-process-pt-2-w-karis-onyemenam', 2, 0, null,
    [span("I think our perception of things is, \"if we don't get this when we want, then it's a waste of time.\" I can't tell you how many people I have spoken with, that maybe it didn't necessarily lead anywhere if I look at it from a certain perspective, but still had an impact. You're not looking at how you are changing as a person. If you move through life that way, you will always be discontent and dissatisfied. So I say this for anyone who has maybe gone through recruiting cycles with nothing. My first piece of advice is that if you are a Christian, commit the situation to God and pray about it. Sometimes you go through something or you stop, and somebody asks you, why do you actually want to want that thing? Why do you want to work in this company? Why do you want to work in this industry? And if you search yourself and your reasons are your parents, how people will view you, those aren’t good reasons. But I would say don't waste the time during the period where it's not working. Because every single day, there's something you're learning, every single opportunity is not wasted. By the time I got the job I was more mature. I picked up on skills that when I got in there, I was not completely clueless. Somehow looking at those things and saying that what has this done to my character, if you go through disappointments in recruiting cycles, I guarantee you that by the time you finally break into the industry, you just have a different mindset. Make the most of every single season, including the seasons, where you feel like things are not working out for you.")]],

  ['conv-ep-007-owning-and-walking-in-your-unique-journey-w-funke-braithwaite', 4, 1, null,
    [span(" Thank you so much for sharing that. "), span("Could you share vision of your hub and how have you’ve been able to find the confidence to really walk in it?", ['strong'])]],

  ['conv-ep-007-owning-and-walking-in-your-unique-journey-w-funke-braithwaite', 33, 1, null,
    [span(": That’s what growth is. I was listening to a sermon, I think it was Rich Wilkerson and called ", []),
     span("What makes God angry–", ['em']),
     span(" what makes God angry is stagnation, and he was talking about when Jesus cursed the fig tree, because it was refusing to grow and was stagnant. And I feel like, if you feel that discomfort within you–and that discomfort can be an irritation with yourself, it can be lethargy, feeling tired, it can be depression–your body's essentially telling you that ")]],

  ['conv-ep-007-owning-and-walking-in-your-unique-journey-w-funke-braithwaite', 35, 1, null,
    [span(" Yes, like the verse I posted on my Instagram post was so important to me because I didn't want people to just see the success of what I had done. The point of that post was like, "),
     span("see, this is what I had to endure", ['em']),
     span(". Like if you want to get this, it’s not just getting and renting a space. I mean, you knock down some walls, paint a bit and put up a sign. ")]],

  // ep-008 block17 + block40 already patched in the earlier partial run — skipped here.

  ['conv-ep-009-walking-with-intention-w-tsemaye-jemide', 13, 0, null,
    [span("Tsemaye:", ['strong']), span("Yeah, next minute you see your cart.")]],
  ['conv-ep-009-walking-with-intention-w-tsemaye-jemide', 29, 0, null,
    [span("Rhieme:", ['strong']), span("Thank you for sharing that. I love what you said about how it really has to do with preparing yourself for your future. I even forgot to mention how from the events you've hosted, you've put aside money. It just ties in with what you're saying now. You manage your finances with the future in mind. We’re still quite young, but it doesn't mean we can't start developing some good habits. At some point, you would like to have your own skincare line and it’s in line with moving from idea to execution. A lot of people can say, I want to have x or y but you have to actually sit down and ask, ")]],

  ['conv-ep-011-having-confidence-in-your-calling-pt-2-w-tilewa-odedina', 0, 0, null,
    [span("But before you read further, take a minute to "),
     span("pause and appreciate how far you've come.", ['em']),
     span(" You may not be where you want to be and that's okay.Progress over perfection always.I hope this conversation encourages you to take further steps into your calling, you're already on the right track.")]],
  ['conv-ep-011-having-confidence-in-your-calling-pt-2-w-tilewa-odedina', 20, 0, null,
    [span("Tilewa:", ['strong']), span("Yeah, you will have to do much, you must do too much that’s the truth because He’s called you to stand out. You're not going to do the normal.You have to stand out you’re a city set on a hill. ")]],
  ['conv-ep-011-having-confidence-in-your-calling-pt-2-w-tilewa-odedina', 23, 0, null,
    [span("Tilewa:", ['strong']), span("I think definitely take out time to go away and hear from God. If you don't know how to hear from God, learn how to hear from Him first then go away. Retreats, you can't substitute that. You can't.")]],
  ['conv-ep-011-having-confidence-in-your-calling-pt-2-w-tilewa-odedina', 30, 0, null,
    [span("Rhieme:", ['strong']), span("Yeah thank you for that. When those feelings come, as you said let God order your steps.When you write down everything He’s saying, you can at least go back to what He’s spoken over you and affirm yourself with those truths. It's definitely scary, especially when you can't see anyone doing what you're doing. That's when it's even scarier. As you said in the corporate world, there's more structure, you know, you're going to be paid every month, you have set hours.When you're running your own business, it’s completely different but at least you know you have God’s word. I've learnt that as much people supporting you is great, they don't always see you as God sees does. So when you need a confidence booster, I feel like the first resort should actually be going back to God’s word. When you say God is ordering your steps, your life isn’t in the hands of people, regardless of whether or not they support you, you keep going. I don't know if this has happened to you but sometimes there’s a heaviness that comes when it’s time to release something.")]],

  ['conv-ep-012-pursuing-purpose-through-authenticity-w-lamide-odanye', 22, 0, null,
    [span("Rhieme:", ['strong']), span("That is so important, especially what you said about being ready. We're always like ")]],

  ['conv-ep-013-embracing-trailblazing-w-oyinkan-olagbegi', 19, 1, null,
    [span(" I love what you said about how to when you started, you didn't really know God out well but your mum heard a word from God.Some people may get confused and wonder how then directed you? You had spoken to your mum about it because He had given you those ideas.Also what you said about how God uses Sapphire to hold you accountable, I definitely understand that.He will put you in a position where you know you can’t do it without Him.That’s how I feel with the blog.He does it to stretch you even more and of course you’re not going to go to God only for your business. "),
     span("Everything God will tell you will flow from your relationship with Him.", ['em']),
     span("He knows how much He wants you to grow and He knows what will get you, He knows you best.")]],

  ['conv-ep-014-positioning-yourself-with-intentionality-in-mind-w-arese-ugwu', 11, 3, null,
    [span(" Because it's something that we're not taught in any formal framework in secondary school, university, and we just have to start figuring out what to do with our finances when we get our first job or start our business. For most people, you end up making a lot of mistakes first right and I think the key thing that they don't tell us right is that "),
     span("financial freedom is when you get to the point where your passive income from the assets you’ve been systematically building can pay for your lifestyle.", ['em']),
     span("So the way that we're taught is go to school, get a good job, start a business. And as long as you're successful at that, you'll be successful. But then we find ourselves in a place where we're earning, earning, earning, but earning and spending in a cycle that isn't necessarily sustainable when it comes to building your financial future. So I think we need to understand that the money in our bank accounts doesn’t translate to what we can afford and ")]],
  ['conv-ep-014-positioning-yourself-with-intentionality-in-mind-w-arese-ugwu', 29, 2, null,
    [span(" That is a mantra I have to say over and over again, as I said, Arese you can do hard things, Arese you can do hard things. Because sometimes being an adult is scary. You take on stuff and you don't know if you're going to be able to execute or your dreams seem way bigger than you feel you're capable of doing. Or sometimes you're even so excited about your dreams or your vision or ideas and then Nigeria happens. You have to roll with the punches and I don't want to glorify difficulty because there's no glory in it to be quite honest. But I think it's important for people to learn from when they're young that bad stuff happens, obstacles will happen, the space between the excitement of your idea and actually executing, a lot of things will happen in between and you have to be mentally tough and ready to be able to deal with those obstacles you have.You have to mentally be in a place where you're constantly ready to solve problems. Let me give you an example, when I did the TV series, I'd never produced anything on that scale ever. And I had to think it through from, how am I going to raise the money for this? Even if I do raise money for it, how am I going to pay investors back? Because the revenue streams don't seem very clear. If I use this thing, I want to turn this book into a TV series, how am I going to do that when I didn't go to film school? I haven't worked in Nollywood before and I didn't have all these years of experience that, you know, a lot of people had, but I basically had to figure out step by step from how are we going to turn the book into a script? Is this script good enough? How, how am I going to convince a cast? That is stellar worth or worth there anything like to be part of this project? How am I going to make sure that we produce something that is quality, that we can be proud of? It took a lot of work it took a lot of learning, there was so many obstacles in the process, but I felt like what kept me going was "),
     span("Arese you can do hard things,", ['em']),
     span("you can do hard things, and just being ")]],
  ['conv-ep-014-positioning-yourself-with-intentionality-in-mind-w-arese-ugwu', 32, 0, null,
    [span("Arese:", ['strong']), span("I think it's also important to say something. You know even if I’ve taken a very unconventional path, I think to a certain extent, I'm happy that I got the degrees and I got the traditional education I needed. Everything sort of prepared me for this all for now. Like my education prepared me for now. So even if I'm not going through a traditional career path, the education that I did have was very traditional and has helped me in a lot of aspects in being able to execute my goals. But I think if your parents are like law school, just do the law school, and then when it's done, you have it. You've gotten your skills, you know from that, and you get to do whatever like you want to do. So I think there's definitely value because I've been worried that the way the world is going, because we saw people who have social media careers there are no real skills and that is very scary. We are going into a season where no one wants to go to university anymore or university with a quote, ‘oh, this person dropped out of uni’. But I feel like ")]],
  ['conv-ep-014-positioning-yourself-with-intentionality-in-mind-w-arese-ugwu', 34, 0, null,
    [span("Rhieme:", ['strong']), span("Yeah that is so important. I personally, I see myself going down the traditional route but then there are so many people who think if you're going down that way, then it's a waste of time why don't you just hop on YouTube and become a YouTuber. Whilst that's for some it’s also realising ")]],

  ['conv-ep-015-staying-rooted-in-your-identity-w-dolapo-morgan', 19, 1, null,
    [span(" So yeah, it goes back into the story I was telling about, trying to get a job in the UK and not getting any of them.In terms of how I was able to hold on to them I think it's just your mindset.Just like fixing your eyes on who you believe you are based on what God has said. So I think an experience that really helped me with that was as I said I schooled in Nigeria and I didn't do well at all.When I came to England for A levels, I remember just coming with a different mindset. For my final year in school, I was like no, I actually want to sit up, I actually want to do well but it was almost too late then. So I was like when I come here, it can be a fresh start and I can put in a lot of effort. I remember my first AS exam, that experience really formed the fact that even though your "),
     span("yesterday was something else your today can be different.", ['em']),
     span("It’s not that deep, because it just exams, but for me it was deep because that was not who I was. I was never someone that used to do well, become top of the class. I remember that exam I think I got like, 100% and I was shocked. I was like, this is not my result and I believe it was also due to the resilience.I was like ")]],
  ['conv-ep-015-staying-rooted-in-your-identity-w-dolapo-morgan', 19, 5, null,
    [span(" I guess because I was able to go from 0 literally to 100 and that gave me some resilience to believe that things are actually possible, anything's actually possible. I'm sure if they told my teachers that I got that job they would be like how? That cannot be Dolapo. If you give things your best if it's meant to be it really would be.I felt during that experience of getting rejections of jobs in the UK, I was giving my best, I was putting in the hours, I was doing my own part. So it was almost like, if it didn't work out, then maybe that’s not what God has planned for me.It doesn't define the fact that I can't get a job.It's not meant for me, I've done my own part and the Bible says He will complete the work He has started in me."),
     span("So if He didn't complete it, then that doesn't mean that's the end of it. Try and redirect.", ['em']),
     span("That was the mindset I went into. I remember praying a prayer like Lord this is my last application I needed to focus on my dissertation at that point in time. If I don't get any of these, I’m not doing it again.I didn't want to get a sub-par job. I wanted to get the best of the best type of companies that were available. So I was like, ")]],

  ['conv-ep-016-letting-go-and-embracing-the-new-w-toyosi-alexis', 11, 0, null,
    [span("So it was really difficult because I would hide in the bathroom, I would come out, I would cry, I will go home. It was awful. I did not really like being in that school at that point in time like I just felt like it was every day here we go again. Time went along and I feel like that affected my confidence. But I didn't even realise it. So the people left the school. But I was still in that environment that nurtured a version of me that wasn't really who I was meant to be. So I was just gliding through and just trying to survive and just leave the school. And like thinking that me leaving the school was me leaving behind everything.As much as removing yourself from an environment helps, you have to deal with it. So when I got into A levels then I was in a relationship with someone and all those insecurities started coming back up, because I felt like I needed that person's validation to verify who I was and I just relied on the person so much. That was really a rocky phase because I'm battling A levels, the hardest period of my life. I did not like my A level school. So I had good friends there and stuff, which was amazing, because I met amazing people there but I did not see the reason why.I just kept going through life and was like why are these things happening? Why is life likee this? Why am I here? You know, and it was a back and forth journey. When you start asking yourself, why are you here negative voices are like, life is pointless, you’re just here to suffer. You're here to struggle. And it's no "),
     span("there's more to life than that.", ['em']),
     span("Then I finally got out of the emotionally abusive relationship and that was the start of what was probably the worst period of my life, but it turned out to be the best because I was forced to actually deal with everything. And it wasn't what this person had done to me it was everything like things from even before. I believe people can hurt you, ")]],

  ['conv-ep-017-shedding-and-blooming-to-become-w-mazino-malaka', 7, 7, null,
    [span(". Desperation particularly, you know, the Bible talks about Jacob and how when Jacob wrestled with God he received a new name. That place where he wrestled with God was called Penuel. He came face to face with God and I believe I've been through a lot of wrestling with God and a lot of tug of war. Where I'm literally like God you must and you will. I need you and you must touch me.It must be evident in my life that I've been around you.So a lot of wrestling a lot of desperate cries, a lot of desperate tug of wars and for my identity. Because you know, that wrestle Jacob was having, I won't let go until you bless me was actually a wrestle for his identity. So I think "),
     span("I've had to fight a lot to stay rooted in who God says I am.", ['em']),
     span("Because there are so many ")]],

  ['conv-ep-018-owning-and-having-confidence-in-your-story-w-daniel-adesiyan', 5, 0, null,
    [span("Daniel:", ['strong']), span("The first thing for me is owning your story is really about understanding that we're all different. I strongly believe in uniqueness and individuality. Growing up my dad would say this, ‘you’re not like the other kid’. I didn't understand what that actually meant and when now I do. So for example, if I go to my dad, I say, oh, that I want a pair of shoes. He says why I say Oh, because x has it. My dad said to me no but if that's the reason why you want to have it, it’s simply comparison. I think that's something we struggle a lot with in this generation. Comparison complex, that we're constantly comparing ourselves to other people. It might seem like we compare ourselves based on the number of likes or how many followers or how rich you are the type of lifestyle you live.That subconsciously goes into how we experience life. So I feel like for me it just got to a position where I started to realise that uniqueness and being embracing yourself as an individual is such a great asset because no two people are the same. Think about it. Everyone is different it got to a point where I wanted to separate myself from other people because I didn't want someone else's glory. Like I want it to be my own self I like to do my own stuff and I like for people to see me and say this is Daniel. I don't want them to sit down and say this is Rhieme’s friend, I want you ")]],

  ['conv-ep-019-navigating-finances-whilst-living-a-wholesome-life-w-bukiie-smart', 32, 0, null,
    [span("Rhieme:", ['strong']), span("Definitely, thank you so much. In one of your podcast episodes, you spoke about financial mistakes that should not be in your 20s.")]],

  ['conv-ep-021-healing-through-pain-w--uzoma-iroche', 0, 0, null,
    [span("This week we're here to remind you, "),
     span("your healing matters too.", ['em']),
     span("Everything we do should come from a place of wholeness.Wherever you find yourself whether right in the middle of your healing journey or just about to start, I hope this conversation makes the process easier.")]],

  ['conv-ep-022-trusting-the-process-and-owning-your-journey-w--abiola-babarinde', 23, 0, null,
    [span("Rhieme:", ['strong']), span("I love that you’re constantly seeing the lessons in different seasons as stepping stones for the next. As you said, not seeing things as the end of themselves. But more of I ")]],

  ['conv-ep-023-empowerment-vulnerability-w-temidayo-seriki', 2, 2, null,
    [span(" I hope this conversation stirs strength within you.")]],
  ['conv-ep-023-empowerment-vulnerability-w-temidayo-seriki', 29, 7, null,
    [span(" Your willingness to be vulnerable is already putting you at an advantage because that willingness is what's going to push you. For those who might not be willing, I would also say the same thing, if not something very similar, you should learn from that experience and not let that work to your own detriment. Because the moment you stop expressing, you keep things in, "),
     span("you will explode at", ['em']),
     span(" some point. I just feel like that's how our bodies are. So you have to do it for your own good, not for anyone or not for any group of people. ")]],
  ['conv-ep-023-empowerment-vulnerability-w-temidayo-seriki', 36, 1, null,
    [span(" I’ll just say especially because we're talking about vulnerability, which I feel like is a big part of manhood, "),
     span("manhood is not defined by what society has told you", ['em']),
     span(". Manhood to me is being who you want to be, unapologetically being yourself. So just do that and if you're the person that likes football awesome if you don’t awesome. If you like pink awesome, pink looks the best on me, really. So just be yourself and don't let anyone make you feel less of a man because you want to do something that you like to do.")]],

  ['conv-ep-024-standing-firm-w-ijeoma-adesanya', 19, 1, null,
    [span(" Thank you for that. What you said especially about the unknown, you're not really sure what's next but it's not the unknown in the sense that God will definitely give you a word. What you said about hearing from him directly is so important because when people give us words, "),
     span("it should only serve as confirmation", ['em']),
     span(". So maybe God may not have told you what that person has said but he will always say it to you too.It’s more important to move based on the word he's giving you, as opposed to different people speaking over you or throwing ideas at you. As you said, the more you keep on saying yes to him, the intimacy goes deeper, you trust Him more. Also the importance of knowing God, you can’t trust who you don’t know. A lot of people my age are very worried, a lot of them feel behind and say things like, they're not doing anything, what is the next step? I always say focusing on knowing God first, being familiar with his voice and how he speaks to you. Then everything else, what you should do, or what is next will come but he cares more about your relationship with Him. He cares more about who you're becoming in Him.")]],
  ['conv-ep-024-standing-firm-w-ijeoma-adesanya', 29, 0, null,
    [span("Rhieme:", ['strong']), span("Thank you so much for sharing. ")]],

  // ep-027 blocks 8, 11, 15, 36, 43 already patched in the earlier partial run — skipped here.

  ['conv-ep-029-uncovering-to-heal-w-shide-ugbaje', 11, 3, null,
    [span(" The word the Lord gave me last year 2020 was rebuilding the temple, but for me to rebuild a temple in my life and intimacy with God. So 2020 was more of you’ve seen and tasted the goodness of God but where you’re going I need you to work through setting things in your life, that are hindering your development in me and your ability to look more like Christ. I started going through that process and there are many things that helped me start. Navigating forgiveness and healing started by being plugged into the right community. My church I was going to would have cluster campaigns, talking about healing, forgiveness and conflict resolution My church as well, the Liberty church, they don't shy away from talking about difficult topics. We've been planning to have this. I've even learned even more again from that Sunday service so I think the timing for this is actually divine timing. Last year, I recorded a podcast with my friend Bimpe for Conversations with Bimpe Abiade and it was on healing. Looking back from that time period in my life, I thought, wow, I've grown so much from being able to forgive people that hurt me and I didn't think I could ever forgive, I didn't even think I needed to forgive them. I thought I was justified with my anger; I'm allowed to be angry at these people for what they have done to me and I sat comfortably in that place. God really took me through this process, He said these are the people I want you to forgive and not only forgive, but to ask them for forgiveness, because of the things I have thought about them. God was like, you have to also ask for forgiveness because you too have been wrong, you put this person in prison and I had to really reflect. I remember being so excited with the work God had been doing in me and now a year over a year on, I can still see how "),
     span("forgiveness and healing has really propelled me into the destiny God has called me to have.", ['em']),
     span(" To give some examples, some were people who I would say had spoken badly about me and said things that hurt my reputation at a younger age. Even my father, my relationship with him I had to choose to forgive him and ask for forgiveness on how I treated him as a daughter.")]],
  ['conv-ep-029-uncovering-to-heal-w-shide-ugbaje', 34, 0, null,
    [span("So even though these people are slaying me or I'm angry and I don't want to forgive, I'm going to trust you. I'm going to give this to you, "),
     span("help me take the next step.", ['em'])]],

  ['conv-ep-031-entering-into-the-creative-industry-w-fego-achakobe', 9, 0, null,
    [span("Rhieme:", ['strong']), span("Yeah, thank you so much for sharing. And I love what you said about reaching out first because you have to humble yourself. As you said, when people start seeing you working with different brands they’ll wonder, whose is she? Let’s actually reach out.")]],
  ['conv-ep-031-entering-into-the-creative-industry-w-fego-achakobe', 19, 3, null,
    [span(" When it comes to equipment and just starting, I feel like it's something that you don't need the best equipment your iPhone can do a great job really. In terms of content, if people really like your content, editing doesn't have to be over the roof. My editing isn't like anything over the top, but because my content is already good and the quality of my content is good, it's easy for people to be interested in my videos. A lot of times, people follow you for different reasons. Some YouTubers are really into editing like Andrea, her edits are so good. Some others are simply vloggers, they do the edits which still works. So if you want to start doing something with the editing process, it’s something you can learn. You don’t have to learn it to the point where you're a professional, "),
     span("you could do the simple ones.", ['em']),
     span(" As you continue going, you're going to build up. But the thing about is ")]],

  ['conv-s-2-ep-001-running-with-the-vision-w-dekola-thompson', 5, 1, null,
    [span(" Starting wasn't the easiest thing. It's one thing to have an idea, it's another thing to actually go ahead and execute. The leap of faith I guess is always a very scary decision to make, to go ahead and execute your idea. So although I knew it was time to execute my idea, I had been physically ‘stationary’ for a long time. It's almost as if I forgot how to use my legs, metaphorically speaking. But one of my friends Daniel pushed and showed me enthusiasm. To me, something that's super important is when you have people around you who can see the vision and are excited to see you do well, it's a very big plus. Oftentimes you find that even without your co-sign, it's those closest to you who are able to sustain "),
     span("the vision.", ['em']),
     span(" Thus, I'm thankful for the friends I had and still have around me, praying with them played a massive part to where I am today.")]],

  ['conv-s-2-ep-002-having-courage-to-pivot-w--delphine-chui', 31, 0, null,
    [span("Delphine:", ['strong']), span("Well, firstly, I just wanted to say that every time you give me feedback on my answers, I'm like, wow, she's making me sound so much more clever than I am. I love it. It's also nice to hear your reflection on what I'm saying. Regarding the decisions I’ve made,my life has really changed in the past three years. I had a very, high status job I I was travelling all the time, I was with celebrities, all these kind of things that I thought would make me happy. But I knew I had this longing for something else. The past three years, in some ways, God stripped me of everything. I left my secular relationship, some of my friendships dwindled down, I suppose we had different priorities.I think making that decision, like trying to always choose the path to heaven, not just the easy path it's been difficult for me, but it has really opened so many avenues. So for example, now, my charity is really doing well, there's a high demand for it. I've got enough freelance work to keep me financially stable. By God's grace,I’ve been given new opportunities to write for other Catholic women, and also I do videos for other Christians. And I ask, when did I ever think I would have the opportunity to do these? These are things that have just come into my life.It’s about making the decision to let go of what you let go of the life you thought you were going to live. For the past few years, I've been entering into my real identity. This whole time I’ve been discovering who I truly am.")]],

  ['conv-s2-ep003-walking-on-your-unique-path-w-lanaire-aderemi', 28, 0, null,
    [span("I also think it's important to point out that creative block is oftentimes a key indicator that you need to rest. One of my friends had told me she was struggling to write and I said to her, maybe this is your season of just consuming and reading. It isn't just about writing. By immersing yourself into the world you want to replicate, it becomes easier to express that world through your creative medium. But in line with everything, I would just say to assess your habits because as humans we are creatures of habits. If you commit to doing things enough times, it will come naturally. If everyday you say to yourself “I'm going to do two hours of work from 10 to 12.”, eventually the creative block will fall because now you're continually chipping away at the “block”. Also, never underestimate the power of a change in scenery. I know for me even just changing my position from time to time does wonders. I’ll even be in the same house, yet I switch from sitting at my desk to standing. I feel like this movement really allows things to flow.")]],
  ['conv-s2-ep003-walking-on-your-unique-path-w-lanaire-aderemi', 30, 0, null,
    [span("Also I love how you touched on the importance of rest. Pausing really allows us to gain clarity on the current seasons we are walking in. Because, there are times where ,although you may not be producing anything externally, behind the scenes there's a lot going on. So I think by engaging in rest, you allow yourself to be built up as a person in preparation for what you're about to build. And I myself can attest to this as it happened to me last year. So for context, I had been releasing one episode every week, from May to December because that was what God had asked me to do. Looking back now it's been crazy. People would always say yes and I'd never received any straight rejections from those I'd asked to interview. But in December, God had told me to just stop. Obviously when he said this, I didn't know what was next in any way, but I reassured myself that this is God, so let me listen to the person who is instructing me. And so by intentionally slowing down, I ended up benefitting in so many different ways, as God really started blowing things up. But again thank you so much for sharing.")]],

  // s2-ep004 blocks 7 + 42 already patched in the earlier partial run — skipped here.

  ['conv-s2-ep006-evolving-with-the-vision-w-imade-ogbemudia', 21, 3, null,
    [span(" Yes, situations may be out of your control, but, ultimately, lGod wants the best for me, so I had to trust him, be confident and depend on him. ")]],
]

async function main() {
  const docIds = [...new Set(fixes.map((f) => f[0]))]
  const docs = new Map()
  for (const id of docIds) {
    const doc = await client.fetch(`*[_id == $id][0]{_id, body}`, { id })
    if (!doc) { console.error('MISSING DOC', id); continue }
    docs.set(id, doc.body)
  }

  // Apply splices within each (doc, block) group highest-span-index-first, so an
  // earlier splice's insertion doesn't shift the index a later splice targets.
  const sorted = [...fixes].sort((a, b) => b[1] - a[1] || b[2] - a[2])

  const touched = new Set()
  for (const [docId, blockIdx, spanIdx, , newSpans] of sorted) {
    const body = docs.get(docId)
    if (!body) continue
    const block = body[blockIdx]
    if (!block || block._type !== 'block') {
      console.error(`SKIP ${docId} block ${blockIdx}: not a block`)
      continue
    }
    block.children.splice(spanIdx, 1, ...newSpans)
    touched.add(docId)
  }

  for (const docId of touched) {
    await client.patch(docId).set({ body: docs.get(docId) }).commit()
    console.log('patched', docId)
  }
  console.log(`\nDone. ${touched.size} docs patched, ${fixes.length} spans fixed.`)
}

main().catch((err) => { console.error(err); process.exit(1) })
