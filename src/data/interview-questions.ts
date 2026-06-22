export interface Flashcard {
  id: number;
  category: string;
  question: string;
  hint: string;
  answer: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
}

export const flashcardsData: Flashcard[] = [
  // Leadership & Conflict
  {
    id: 1, category: 'Leadership & Conflict',
    question: "Tell me about a time you disagreed with a coworker. How did you resolve it?",
    hint: "Focus on communication, empathy, and finding a productive solution, rather than the conflict itself.",
    answer: {
      situation: "My team and a colleague from marketing disagreed on the launch timeline for a new feature. They wanted it ASAP, but we needed more time for QA.",
      task: "I needed to align our goals, ensuring product quality without derailing the marketing campaign.",
      action: "I scheduled a 1-on-1 with the marketing lead to understand their constraints. I presented our QA risks and proposed a phased rollout, releasing core features first and secondary features later.",
      result: "We agreed on the phased approach. The launch happened on time with zero critical bugs, and marketing was able to run their campaign successfully."
    }
  },
  {
    id: 2, category: 'Leadership & Conflict',
    question: "Describe a time when you had to manage a difficult team member.",
    hint: "Show empathy and your ability to have difficult but constructive conversations.",
    answer: {
      situation: "I managed a developer who was highly skilled but frequently missed deadlines and had a negative attitude in meetings.",
      task: "I needed to address the behavior without alienating them, as their skills were vital to the project.",
      action: "I scheduled a private 1-on-1 and asked open-ended questions. I discovered they were dealing with personal issues and felt burnt out. We adjusted their workload and set clear expectations for communication.",
      result: "Their performance improved significantly over the next month, and their attitude in team settings became much more collaborative."
    }
  },
  {
    id: 3, category: 'Leadership & Conflict',
    question: "Give an example of a time you stepped up to lead when you weren't the official leader.",
    hint: "Highlight initiative, emotional intelligence, and ability to unite people.",
    answer: {
      situation: "During a major project, our project manager had to take an unexpected medical leave right before a crucial client presentation.",
      task: "The team was disorganized and unsure who was handling which parts of the presentation.",
      action: "I stepped in, scheduled a quick alignment meeting, divided the presentation based on everyone's strengths, and set up a dry run the day before.",
      result: "The client presentation went flawlessly, and we secured the contract extension. The team thanked me for stepping up during a chaotic time."
    }
  },
  {
    id: 4, category: 'Leadership & Conflict',
    question: "Tell me about a time you had to persuade someone to see things your way.",
    hint: "Focus on logic, data, and understanding their perspective.",
    answer: {
      situation: "I wanted to switch our project management tool to Jira, but my manager preferred sticking to our legacy system because it was cheaper.",
      task: "I had to convince them that the long-term efficiency gains outweighed the short-term cost.",
      action: "I tracked our team's wasted hours due to the legacy system for two weeks. I presented a cost-benefit analysis showing that the new tool would pay for itself in saved engineering hours within a month.",
      result: "My manager approved the switch. Three months later, our team's delivery velocity had increased by 15%."
    }
  },
  {
    id: 5, category: 'Leadership & Conflict',
    question: "Describe a time you had to deliver bad news to a client or stakeholder.",
    hint: "Show accountability, transparency, and solution-orientation.",
    answer: {
      situation: "Due to an unforeseen API limitation, we couldn't deliver a requested feature by the promised deadline for a major client.",
      task: "I had to inform the client without damaging the relationship.",
      action: "I called the client immediately rather than emailing. I explained the technical issue transparently, took full responsibility, and presented two alternative solutions with revised timelines.",
      result: "The client appreciated the honesty and proactive problem-solving. They chose one of the alternatives, and we retained their business."
    }
  },
  // Problem Solving
  {
    id: 6, category: 'Problem Solving',
    question: "Describe a situation where you had to solve a difficult problem with limited resources.",
    hint: "Highlight your resourcefulness, prioritization skills, and ability to think outside the box.",
    answer: {
      situation: "At my previous startup, our primary server crashed during a major sales event, and our lead DevOps engineer was on leave.",
      task: "I had to restore service immediately to prevent significant revenue loss, despite not being a DevOps specialist.",
      action: "I quickly rallied two backend developers. We consulted the runbooks, bypassed the failing load balancer temporarily, and spun up backup instances using a secondary cloud provider we had on standby.",
      result: "We restored service within 45 minutes, saving an estimated $50k in sales. I later led an initiative to automate our failover processes."
    }
  },
  {
    id: 7, category: 'Problem Solving',
    question: "Tell me about a time you anticipated a problem and prevented it.",
    hint: "Show foresight, analytical thinking, and proactive behavior.",
    answer: {
      situation: "While reviewing the architecture for a new feature, I noticed that the proposed database queries would cause a bottleneck if user traffic spiked.",
      task: "I needed to address this before development began to prevent future downtime.",
      action: "I modeled the expected data load and presented the findings to the lead architect. I proposed adding a caching layer using Redis to handle the expected read-heavy operations.",
      result: "The architecture was updated. When the feature launched and went viral, our servers maintained 99.99% uptime without any latency issues."
    }
  },
  {
    id: 8, category: 'Problem Solving',
    question: "Describe a time when you had to make a decision without all the information you needed.",
    hint: "Demonstrate calculated risk-taking and logical deduction.",
    answer: {
      situation: "We were launching a new marketing campaign, but the A/B testing data for our primary ad creative was inconclusive due to a tracking bug.",
      task: "We had a hard deadline to launch the campaign the next morning and had to pick a creative.",
      action: "I analyzed historical data from similar past campaigns and consulted with the sales team about current customer pain points. Based on qualitative feedback and past trends, I made the call to go with Creative B.",
      result: "The campaign outperformed our benchmark by 20%, proving that qualitative insights can successfully bridge data gaps."
    }
  },
  {
    id: 9, category: 'Problem Solving',
    question: "Give an example of a time you used data to solve a complex problem.",
    hint: "Focus on your analytical process and how data drove your actions.",
    answer: {
      situation: "Our e-commerce checkout page had a sudden 15% drop in conversion rate, and nobody knew why.",
      task: "I was tasked with identifying the root cause and fixing it.",
      action: "I dug into our analytics platform and segmented the drop-off data by device, browser, and region. I discovered the drop was entirely on mobile devices using iOS Safari. I then reproduced the issue and found a CSS bug blocking the 'Pay' button.",
      result: "I pushed a hotfix within two hours. The conversion rate returned to normal immediately, recovering thousands of dollars in daily sales."
    }
  },
  {
    id: 10, category: 'Problem Solving',
    question: "Tell me about a time you found a creative solution to a persistent problem.",
    hint: "Show innovation and your willingness to challenge the status quo.",
    answer: {
      situation: "Our customer support team was overwhelmed with repetitive queries about password resets, increasing wait times for complex issues.",
      task: "I wanted to reduce the volume of these simple tickets without hiring more staff.",
      action: "I suggested and implemented a self-serve chatbot on the login page specifically designed to handle password resets and account unlocking automatically.",
      result: "Ticket volume dropped by 30% in the first month, allowing the support team to focus on high-value customer interactions and improving our CSAT score."
    }
  },
  // Adaptability
  {
    id: 11, category: 'Adaptability',
    question: "Tell me about a time when a project's priorities changed suddenly. How did you adapt?",
    hint: "Show flexibility, level-headedness, and how you manage scope change and stakeholder communication.",
    answer: {
      situation: "Two weeks before launching a highly anticipated mobile app update, new compliance regulations required a complete overhaul of our user consent flow.",
      task: "I had to pivot the entire development team to prioritize the compliance feature without pushing the launch date.",
      action: "I immediately held a standup to halt non-critical work. I rescoped the release, communicated the changes to stakeholders, and paired developers to tackle the consent flow rapidly.",
      result: "We built the compliant flow in one week, completed QA, and launched on the original date, fully adhering to the new regulations."
    }
  },
  {
    id: 12, category: 'Adaptability',
    question: "Describe a situation where you had to learn a new technology or skill quickly.",
    hint: "Highlight your learning methodology and resourcefulness.",
    answer: {
      situation: "My company acquired a smaller startup whose product was built in Go, a language I had never used.",
      task: "I was assigned to integrate their API into our main platform within three weeks.",
      action: "I dedicated my evenings to a crash course in Go, read their documentation extensively, and set up daily pair-programming sessions with one of their former engineers.",
      result: "I successfully integrated the API on schedule and subsequently became the go-to person on my team for maintaining that microservice."
    }
  },
  {
    id: 13, category: 'Adaptability',
    question: "Tell me about a time you were asked to do something you had never done before.",
    hint: "Show courage, willingness to step out of your comfort zone, and how you approach the unknown.",
    answer: {
      situation: "Our company lost its event coordinator just weeks before our annual user conference.",
      task: "My manager asked me to take over managing the logistics and vendor relationships, despite my background being in software engineering.",
      action: "I accepted the challenge. I immediately reviewed all existing contracts, created a master spreadsheet for timelines, and scheduled daily check-ins with the vendors to ensure nothing fell through the cracks.",
      result: "The conference was a massive success with over 500 attendees, and management commended me for my adaptability and organizational skills."
    }
  },
  {
    id: 14, category: 'Adaptability',
    question: "Describe a time when you had to adjust to a new team or manager.",
    hint: "Focus on your interpersonal skills and open-mindedness.",
    answer: {
      situation: "Our company underwent a major reorg, and I was placed under a new manager whose working style was completely opposite to my previous one. They were highly analytical and detail-oriented.",
      task: "I needed to adapt my communication and reporting style to build a strong working relationship.",
      action: "I scheduled a meeting to explicitly discuss their preferences. I learned they preferred data-heavy written updates over verbal briefings. I adapted by creating weekly performance dashboards for my projects.",
      result: "Our relationship quickly strengthened. Because I provided the data they needed proactively, I earned their trust and was given more autonomy on my projects."
    }
  },
  {
    id: 15, category: 'Adaptability',
    question: "Tell me about a time you had to work with a very vague or unclear assignment.",
    hint: "Show how you seek clarity and take initiative when direction is lacking.",
    answer: {
      situation: "I was asked to 'improve the onboarding experience' with no specific metrics, budget, or timeline provided.",
      task: "I had to define the scope of the project and secure stakeholder alignment before executing.",
      action: "I interviewed recent hires to identify pain points, defined three specific, measurable goals (e.g., reduce time-to-first-commit by 20%), and drafted a project proposal outlining the steps and required resources.",
      result: "Leadership approved my proposal. By implementing a standardized documentation portal and buddy system, we reduced onboarding time by 35%."
    }
  },
  // Failure & Growth
  {
    id: 16, category: 'Failure & Growth',
    question: "Tell me about a time you made a mistake or failed at a project.",
    hint: "Own the mistake. The key is what you learned and how you prevented it from happening again.",
    answer: {
      situation: "Early in my career, I deployed a code update without writing adequate unit tests, which broke the checkout process for users on older browsers.",
      task: "I needed to fix the immediate issue and ensure our deployment process was more robust moving forward.",
      action: "I immediately rolled back the deployment. I then fixed the bug, wrote the missing tests, and researched how to implement automated browser testing in our CI/CD pipeline.",
      result: "I presented a new CI/CD strategy to the team. We implemented automated cross-browser testing, reducing post-deployment bugs by 40% over the next quarter."
    }
  },
  {
    id: 17, category: 'Failure & Growth',
    question: "Describe a time you received critical feedback. How did you handle it?",
    hint: "Demonstrate coachability, humility, and actionable improvement.",
    answer: {
      situation: "During an annual review, my manager noted that while my individual work was excellent, I wasn't doing enough to mentor junior team members or share knowledge.",
      task: "I needed to improve my collaboration and leadership skills to progress to a senior role.",
      action: "I didn't get defensive; I thanked them for the feedback. I started holding bi-weekly 'lunch and learn' sessions to share technical insights and offered to officially mentor a new junior developer.",
      result: "Six months later, my manager praised my growth in team leadership, and the junior developer I mentored successfully delivered their first major feature."
    }
  },
  {
    id: 18, category: 'Failure & Growth',
    question: "Tell me about a time you missed a deadline.",
    hint: "Focus on accountability, communication, and how you managed the fallout.",
    answer: {
      situation: "I was managing a data migration project that was significantly more complex than initially estimated, and I realized a week before the deadline that we wouldn't make it.",
      task: "I had to manage stakeholder expectations and minimize the impact of the delay.",
      action: "I immediately alerted my manager and the client. I owned the underestimation, explained the technical blockers, and provided a revised, realistic timeline along with a plan to migrate critical data first.",
      result: "While the client was initially disappointed, they appreciated the proactive communication. We hit the revised deadline, and the phased rollout actually minimized disruption to their business."
    }
  },
  {
    id: 19, category: 'Failure & Growth',
    question: "Describe a situation where a project you were leading failed.",
    hint: "Show resilience and your ability to conduct a blameless post-mortem.",
    answer: {
      situation: "I led the launch of a new premium feature that completely flopped. After three months, adoption was under 2%.",
      task: "I needed to figure out why it failed and decide what to do next without wasting more engineering time.",
      action: "I conducted user interviews and realized the feature was too confusing and didn't solve a primary pain point. I presented these findings to leadership and recommended sunsetting the feature.",
      result: "We sunset the feature, saving $10k/month in maintenance costs. We used the insights to pivot our roadmap toward a highly requested integration, which later drove a 15% increase in upsells."
    }
  },
  {
    id: 20, category: 'Failure & Growth',
    question: "Tell me about a time you realized you were on the wrong track midway through a project.",
    hint: "Demonstrate self-awareness and the courage to change course.",
    answer: {
      situation: "Halfway through developing an internal analytics dashboard, I realized the data visualization library I had chosen couldn't handle the scale of data we needed to process.",
      task: "I had to decide whether to hack together a workaround or scrap weeks of work and start over with a better tool.",
      action: "I paused development, did a quick proof-of-concept with a more robust library (D3.js), and presented the situation to my manager. I explained that starting over would delay the project by a week but ensure long-term stability.",
      result: "My manager agreed with the pivot. The final dashboard was highly performant, and my willingness to admit the mistake early prevented a massive technical debt issue later."
    }
  },
  // Teamwork & Collaboration
  {
    id: 21, category: 'Teamwork',
    question: "Describe a time when you had to work closely with someone whose personality was very different from yours.",
    hint: "Focus on professionalism, finding common ground, and leveraging complementary strengths.",
    answer: {
      situation: "I was paired with a highly extroverted, big-picture designer on a project, while I am an introverted, detail-oriented developer.",
      task: "We needed to design and build a complex user interface within a tight deadline without driving each other crazy.",
      action: "We established clear boundaries and communication styles. I let him lead the creative brainstorming sessions, and I took charge of the technical feasibility reviews. We used a shared document to track decisions so we didn't have to constantly meet.",
      result: "Our complementary skills resulted in one of the most innovative and bug-free features of the year, and we requested to work together on future projects."
    }
  },
  {
    id: 22, category: 'Teamwork',
    question: "Tell me about a time you helped a team member who was struggling.",
    hint: "Show empathy, mentorship, and a team-first mentality.",
    answer: {
      situation: "A junior developer on my team was repeatedly missing sprint goals and seemed overwhelmed by the complexity of our React codebase.",
      task: "I wanted to help them succeed without doing the work for them.",
      action: "I reached out privately and offered to pair-program for an hour each morning. During these sessions, I focused on explaining the 'why' behind architectural patterns rather than just fixing their code.",
      result: "Within a month, their velocity doubled, and they started contributing to code reviews. They later thanked me for helping them build confidence."
    }
  },
  {
    id: 23, category: 'Teamwork',
    question: "Describe a time when you had to rely on a team to get things done.",
    hint: "Highlight your ability to delegate, trust others, and coordinate efforts.",
    answer: {
      situation: "I was tasked with organizing a company-wide hackathon, which involved logistics, marketing, technical setup, and judging.",
      task: "I couldn't possibly do it all myself while maintaining my normal workload.",
      action: "I recruited a committee of five volunteers. I clearly defined roles, established weekly check-ins, and trusted them to execute their domains while I acted as the central coordinator and removed blockers.",
      result: "The hackathon had record participation, produced three prototypes that made it onto the product roadmap, and ran smoothly because the team executed flawlessly."
    }
  },
  {
    id: 24, category: 'Teamwork',
    question: "Tell me about a time your team failed to meet a goal. How did you react?",
    hint: "Avoid blaming others. Focus on collective accountability and process improvement.",
    answer: {
      situation: "Our cross-functional team missed a crucial quarterly goal for user acquisition because our new referral program launched a month late.",
      task: "We needed to report the failure to leadership and prevent it from happening again.",
      action: "In our retrospective, I guided the team away from finger-pointing and toward process analysis. We realized we had siloed our work too much. I proposed we implement cross-functional daily standups for critical projects.",
      result: "Leadership appreciated our objective analysis. We implemented the standups, and the following quarter, we exceeded our acquisition target by 15%."
    }
  },
  {
    id: 25, category: 'Teamwork',
    question: "Give an example of a time you had to build consensus among a group with differing opinions.",
    hint: "Show facilitation skills, active listening, and negotiation.",
    answer: {
      situation: "Our engineering team was split down the middle on whether to adopt GraphQL or stick with our REST API architecture.",
      task: "As the lead engineer, I needed to guide the team to a unified decision to avoid fragmentation.",
      action: "I organized a structured debate. I asked two engineers to present the best case for GraphQL and two for REST. We evaluated both against our specific business needs and technical constraints on a whiteboard.",
      result: "Seeing the objective criteria mapped out, the team reached a consensus to stick with REST for the core API but pilot GraphQL for a new microservice. The decision felt collaborative rather than dictated."
    }
  },
  // Time Management
  {
    id: 26, category: 'Time Management',
    question: "Tell me about a time you had to juggle multiple high-priority projects at once.",
    hint: "Highlight your prioritization framework, organization, and ability to stay calm under pressure.",
    answer: {
      situation: "During Q4, I was simultaneously leading the development of a new feature, onboarding two new hires, and fixing a critical legacy bug.",
      task: "I had to ensure nothing fell through the cracks without working 80-hour weeks.",
      action: "I used the Eisenhower Matrix to prioritize. I blocked my mornings for deep work on the new feature, scheduled onboarding sessions in the afternoon, and delegated parts of the legacy bug investigation to a capable mid-level engineer.",
      result: "I successfully delivered the feature on time, the new hires were fully integrated within a month, and the bug was resolved through effective delegation."
    }
  },
  {
    id: 27, category: 'Time Management',
    question: "Describe a time when you had to meet a tight deadline. How did you manage it?",
    hint: "Focus on scope management, intense focus, and communication.",
    answer: {
      situation: "A major client requested a custom integration that had to be completed in two weeks to align with their product launch.",
      task: "The integration normally takes four weeks to build.",
      action: "I met with the client to negotiate the scope, identifying the absolute 'must-haves' for launch. I then created a strict daily schedule, blocked all non-essential meetings, and provided daily progress updates to the client to ensure alignment.",
      result: "We delivered the MVP integration on time. The client was thrilled and signed a long-term retainer with us, and we added the 'nice-to-have' features in the following sprints."
    }
  },
  {
    id: 28, category: 'Time Management',
    question: "Tell me about a time you realized you took on too much work.",
    hint: "Show self-awareness, communication, and ability to course-correct.",
    answer: {
      situation: "I eagerly volunteered for three different working groups on top of my regular engineering duties, thinking I could handle it.",
      task: "I realized my core project work was suffering, and I was missing deadlines.",
      action: "I immediately spoke with my manager, admitted I had overcommitted, and proposed a plan: I would step down from two of the working groups but ensure a smooth handover of my responsibilities.",
      result: "My manager appreciated my honesty. I successfully transitioned my working group tasks and brought my core project back on track within two weeks."
    }
  },
  {
    id: 29, category: 'Time Management',
    question: "Give an example of a time you improved a process to save time.",
    hint: "Highlight your efficiency, technical skills, and continuous improvement mindset.",
    answer: {
      situation: "Our team was spending three hours every Friday manually compiling weekly performance reports from various data sources.",
      task: "I wanted to automate this tedious task to free up engineering time.",
      action: "I spent an afternoon writing a Python script that pulled data from the respective APIs, formatted it, and automatically emailed the report to stakeholders via a cron job.",
      result: "The script saved the team roughly 150 hours over the course of the year and eliminated human error from the reporting process."
    }
  },
  {
    id: 30, category: 'Time Management',
    question: "Describe a time when your schedule was suddenly interrupted. How did you handle it?",
    hint: "Demonstrate adaptability and rapid reprioritization.",
    answer: {
      situation: "I was in the middle of a complex database migration when a P0 (critical) bug was reported affecting our payment gateway.",
      task: "I had to drop everything to fix the payment issue without corrupting the ongoing migration.",
      action: "I safely paused the migration script and documented the exact state. I then pivoted to the payment bug, pairing with another engineer to isolate and patch the issue within an hour. Once resolved, I carefully resumed the migration.",
      result: "Both issues were resolved successfully. My documentation during the context switch ensured no data was lost during the paused migration."
    }
  },
  // Motivation & Values
  {
    id: 31, category: 'Motivation',
    question: "Tell me about a project that you were particularly passionate about.",
    hint: "Show enthusiasm, intrinsic motivation, and what drives you professionally.",
    answer: {
      situation: "I proposed and led an initiative to make our web application fully accessible (WCAG compliant) for users with disabilities.",
      task: "I needed to audit the app, secure budget, and train the engineering team on accessibility standards.",
      action: "I organized an internal presentation highlighting the moral and business case for accessibility. I led the technical implementation, integrating axe-core into our testing suite, and rewrote major UI components.",
      result: "We achieved AA compliance within three months. The project was incredibly fulfilling because it directly improved the lives of our users and expanded our market reach."
    }
  },
  {
    id: 32, category: 'Motivation',
    question: "Describe a time when you had to work on a project you found boring or uninteresting.",
    hint: "Demonstrate professionalism, discipline, and finding the value in mundane tasks.",
    answer: {
      situation: "I was assigned to manually update hundreds of legacy tests to a new testing framework—a tedious and repetitive task.",
      task: "I had to complete the work accurately and on time without losing motivation.",
      action: "I reframed the task as an opportunity to deeply learn the new framework. I also gamified the process by setting daily completion records and wrote a small script to automate the most repetitive parts of the conversion.",
      result: "I completed the migration a week ahead of schedule and actually ended up writing a best-practices guide for the new framework that the whole team used."
    }
  },
  {
    id: 33, category: 'Motivation',
    question: "Tell me about your proudest professional achievement.",
    hint: "Pick an achievement that aligns with the job you are applying for. Show impact.",
    answer: {
      situation: "Our flagship app had a 3-star rating due to performance issues, which was hurting customer retention.",
      task: "As the lead frontend engineer, I took ownership of overhauling the app's performance.",
      action: "I implemented aggressive code splitting, optimized asset delivery, and migrated our state management. I worked tirelessly for two sprints, measuring and profiling every change.",
      result: "App load time decreased from 4 seconds to 1.2 seconds. Within a month, our app store rating climbed to 4.5 stars, and user retention increased by 12%."
    }
  },
  {
    id: 34, category: 'Motivation',
    question: "Describe a time you went above and beyond your job description.",
    hint: "Highlight initiative, ownership, and value creation.",
    answer: {
      situation: "I was hired as a backend developer, but I noticed our design team was struggling with the handoff process because they lacked technical knowledge of our component library.",
      task: "I wanted to bridge the gap between design and engineering to speed up our development cycle.",
      action: "On my own time, I built a Storybook instance mapping all our React components to their Figma equivalents. I then hosted a workshop for the designers on how to use it.",
      result: "The tool became central to our workflow, reducing UI inconsistencies by 80% and significantly cutting down back-and-forth communication during handoffs."
    }
  },
  {
    id: 35, category: 'Motivation',
    question: "Tell me about a time you faced a major setback. How did you keep yourself motivated?",
    hint: "Show resilience, optimism, and a growth mindset.",
    answer: {
      situation: "After working for six months on a partnership integration, the partner company suddenly went bankrupt, and the project was cancelled entirely.",
      task: "I was devastated, but I needed to keep myself and my two team members motivated for our next assignment.",
      action: "I organized a team lunch where we celebrated the technical milestones we had achieved, regardless of the business outcome. I documented all the reusable architecture we built and successfully argued to repurpose it for an internal tool.",
      result: "By focusing on the tangible skills gained and finding a new use for our code, the team quickly regained their momentum and morale."
    }
  },
  // Client & Stakeholder Management
  {
    id: 36, category: 'Client Management',
    question: "Tell me about a time you dealt with an angry or dissatisfied client/customer.",
    hint: "Focus on de-escalation, active listening, and problem resolution.",
    answer: {
      situation: "An enterprise client called me furiously because a bug in our latest release corrupted their reporting dashboard right before a board meeting.",
      task: "I had to calm the client down and provide an immediate solution.",
      action: "I listened without interrupting, validated their frustration, and apologized sincerely. While on the phone, I pulled the database logs, identified the bad query, and manually generated the CSV report they needed for their board meeting.",
      result: "The client was able to present the data on time. We deployed a hotfix later that day. The client later sent an email to my manager praising my swift and calm handling of the crisis."
    }
  },
  {
    id: 37, category: 'Client Management',
    question: "Describe a situation where you had to say 'no' to a stakeholder or client.",
    hint: "Show diplomacy, firm boundaries, and offering alternatives.",
    answer: {
      situation: "A key stakeholder requested a major feature addition just days before a scheduled code freeze.",
      task: "I had to refuse the request to protect the stability of the release without damaging the relationship.",
      action: "I met with the stakeholder and explained that introducing the feature now posed a high risk of breaking the entire release. I said 'no' to this sprint, but offered a compromise: I promised to prioritize their feature as the very first item in the next sprint.",
      result: "The stakeholder understood the risk and agreed to the delay. The release went smoothly, and we delivered their feature two weeks later as promised."
    }
  },
  {
    id: 38, category: 'Client Management',
    question: "Tell me about a time you managed a project with multiple stakeholders who had conflicting priorities.",
    hint: "Highlight your negotiation, communication, and alignment skills.",
    answer: {
      situation: "I was managing the redesign of our corporate website. Sales wanted prominent lead forms, while Marketing wanted a clean, content-heavy aesthetic.",
      task: "I needed to deliver a design that satisfied both departments' business goals.",
      action: "I organized a joint workshop where we mapped out the user journey. I proposed a solution: a clean, content-rich homepage (for Marketing) with strategically placed, non-intrusive slide-in lead forms triggered by scroll depth (for Sales).",
      result: "Both teams approved the hybrid approach. Post-launch, bounce rates decreased by 15%, and lead generation increased by 10%."
    }
  },
  {
    id: 39, category: 'Client Management',
    question: "Give an example of a time you exceeded a client's expectations.",
    hint: "Show proactive service, attention to detail, and value addition.",
    answer: {
      situation: "I was hired to build a simple marketing website for a local bakery.",
      task: "The requirements were just a few static pages, but I noticed they were struggling to manage custom cake orders via phone.",
      action: "In addition to the static pages, I spent a few extra hours building a simple, secure Google Forms integration that fed directly into a Google Sheet for them to track custom orders, at no extra charge.",
      result: "The client was blown away. The form saved them hours of administrative work each week. They were so happy they referred three other local businesses to me for web development."
    }
  },
  {
    id: 40, category: 'Client Management',
    question: "Describe a time you had to explain a complex technical issue to a non-technical stakeholder.",
    hint: "Demonstrate empathy, clear communication, and avoidance of jargon.",
    answer: {
      situation: "Our application experienced downtime due to a DNS propagation issue, and the CEO demanded to know why the site was down.",
      task: "I needed to explain the situation clearly without overwhelming them with networking jargon.",
      action: "I used an analogy. I explained that the internet is like a massive phonebook, and we just moved to a new house. It takes time for the post office (DNS servers) to update everyone's address book, so some people are still driving to the old, empty house.",
      result: "The CEO immediately understood the concept, stopped panicking about our servers being 'broken', and felt confident communicating the situation to investors."
    }
  },
  // Communication
  {
    id: 41, category: 'Communication',
    question: "Tell me about a time when miscommunication caused a problem on your team.",
    hint: "Focus on how you identified the miscommunication and fixed the process.",
    answer: {
      situation: "A designer and I were working on a feature, and I built the UI based on an outdated Figma file because I didn't see their Slack message about the update.",
      task: "I had to redo two days of work, and we missed our internal milestone.",
      action: "I took responsibility for missing the message, but I also realized our process was flawed. I proposed we stop using Slack for design handoffs and instead use Jira tickets with linked, version-controlled Figma files.",
      result: "We implemented the new process. Since then, we haven't had a single issue with outdated designs, and handoffs are much smoother."
    }
  },
  {
    id: 42, category: 'Communication',
    question: "Describe a time you had to present complex information to a large group.",
    hint: "Highlight your preparation, audience awareness, and presentation skills.",
    answer: {
      situation: "I was tasked with presenting our new microservices architecture to the entire 50-person engineering department.",
      task: "I needed to ensure that everyone from junior frontend developers to senior backend architects understood the new direction.",
      action: "I structured the presentation to start with the high-level business benefits (scalability, deployment speed) before diving into the technical weeds. I used clear diagrams instead of walls of text and prepared a robust Q&A document.",
      result: "The presentation was highly rated. Several teams immediately began decoupling their services based on the guidelines I presented, and the Q&A doc became a permanent part of our engineering wiki."
    }
  },
  {
    id: 43, category: 'Communication',
    question: "Tell me about a time you successfully advocated for an unpopular idea.",
    hint: "Show persuasion, data-backed arguments, and respect for opposing views.",
    answer: {
      situation: "I proposed that we institute a 'no-meeting Wednesday' policy. Management was initially against it, fearing a loss of communication and productivity.",
      task: "I had to convince them to at least try it to combat developer burnout.",
      action: "I gathered industry data showing increased productivity from uninterrupted focus time. I proposed a one-month trial period with strict metrics: we would track code commits and survey team morale before and after.",
      result: "Management agreed to the trial. After one month, code output increased by 22%, and morale scores improved significantly. The policy was made permanent."
    }
  },
  {
    id: 44, category: 'Communication',
    question: "Describe a time when you had to rely on written communication to get a critical point across.",
    hint: "Demonstrate clarity, conciseness, and effective documentation skills.",
    answer: {
      situation: "I discovered a critical security vulnerability in our authentication flow while our lead security engineer was on a flight and unreachable.",
      task: "I had to escalate the issue to the executive team and coordinate a hotfix entirely via email and Slack.",
      action: "I wrote a concise, structured incident report: Executive Summary, Impact (what data was at risk), and Recommended Action (the specific code to revert). I bolded the necessary actions and tagged the on-call engineers.",
      result: "Thanks to the clear and actionable communication, the on-call team understood the severity immediately and deployed the patch within 30 minutes, preventing any data breach."
    }
  },
  {
    id: 45, category: 'Communication',
    question: "Tell me about a time you gave constructive feedback to a peer.",
    hint: "Show tact, professionalism, and a focus on behavior rather than personality.",
    answer: {
      situation: "A peer was consistently talking over others during our daily standups, causing some team members to disengage.",
      task: "I needed to address the behavior without creating a hostile working environment.",
      action: "I asked them for a quick virtual coffee. I used the SBI (Situation, Behavior, Impact) method. I mentioned specific meetings, described the interrupting behavior objectively, and explained that it made it hard for quieter team members to share updates.",
      result: "They were completely unaware they were doing it and apologized. They consciously made an effort to listen more, and our standups became much more inclusive and productive."
    }
  },
  // Innovation & Creativity
  {
    id: 46, category: 'Innovation',
    question: "Tell me about a time you challenged the status quo.",
    hint: "Highlight your courage, innovative thinking, and ability to drive change.",
    answer: {
      situation: "Our company had used the same monolithic deployment process for five years, which required taking the site offline for an hour every Tuesday night.",
      task: "I believed we were mature enough to move to zero-downtime deployments.",
      action: "Despite resistance from senior staff who felt 'if it ain't broke, don't fix it,' I built a proof-of-concept pipeline using blue-green deployments on a staging environment and demonstrated it to the CTO.",
      result: "The CTO was convinced. I led the transition over the next two quarters. We eliminated the weekly downtime entirely, saving the company from losing revenue during those hours."
    }
  },
  {
    id: 47, category: 'Innovation',
    question: "Describe a time you solved a problem in a completely new or unconventional way.",
    hint: "Show creativity, resourcefulness, and out-of-the-box thinking.",
    answer: {
      situation: "We needed to generate thousands of realistic user profiles to test our new search algorithm, but buying a synthetic dataset was out of our budget.",
      task: "I had to find a free, legally compliant way to generate the data quickly.",
      action: "Instead of writing a complex data generator from scratch, I utilized an open-source Markov chain library and fed it public domain literature to generate highly realistic, unique, and varied text bios and names.",
      result: "I generated 100,000 realistic profiles in an afternoon for zero cost, allowing the QA team to fully stress-test the search algorithm ahead of schedule."
    }
  },
  {
    id: 48, category: 'Innovation',
    question: "Tell me about a time you took a risk and failed.",
    hint: "Show that you are willing to take calculated risks and can learn from the outcomes.",
    answer: {
      situation: "I proposed using a cutting-edge, newly released database technology for a side project, believing its promised speed would be a massive advantage.",
      task: "I took the risk of using unproven technology instead of our standard stack.",
      action: "After two weeks of development, we hit a critical bug in the database's core engine that the open-source community hadn't patched yet. We couldn't proceed.",
      result: "I owned the failure. We scrapped the work and rebuilt it using our standard stack. I learned to strictly separate bleeding-edge tech experiments from projects with hard business deadlines."
    }
  },
  {
    id: 49, category: 'Innovation',
    question: "Give an example of a time you successfully pitched a new idea to management.",
    hint: "Focus on your ability to align innovation with business value.",
    answer: {
      situation: "I noticed our developers were spending a lot of time writing repetitive boilerplate code for new API endpoints.",
      task: "I wanted to build an internal CLI tool to scaffold these endpoints automatically.",
      action: "I pitched the idea to management by focusing on ROI rather than cool tech. I estimated the tool would take me one week to build but would save the team 10 hours a week indefinitely.",
      result: "Management approved the project. The CLI tool was wildly successful, and within six months, it had saved the engineering department an estimated 250 hours of tedious work."
    }
  },
  {
    id: 50, category: 'Innovation',
    question: "Describe a time you turned a negative situation into a positive opportunity.",
    hint: "Demonstrate optimism, strategic thinking, and resilience.",
    answer: {
      situation: "Our main competitor suddenly released a feature that made our core product look outdated, and our sales team lost three major deals in one week.",
      task: "Morale was incredibly low, and we needed to respond without just blindly copying them.",
      action: "I organized a 'war room' session. Instead of panicking, we analyzed their new feature and identified its limitations. We realized they had ignored mobile users. I proposed we build a mobile-first alternative that leapfrogged their functionality.",
      result: "We rallied and launched the mobile-first feature two months later. We not only won back two of the lost clients but also tapped into a completely new market segment our competitor couldn't reach."
    }
  }
];
