"use strict";(self.webpackChunkexternal_blog=self.webpackChunkexternal_blog||[]).push([[866],{4612:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"company-q3-offsite-sonoma-2023","metadata":{"permalink":"/blog/company-q3-offsite-sonoma-2023","source":"@site/blog/2023-10-04-company-offsite-sonoma/index.md","title":"Summer Health Q3 Offsite","description":"Why we gathering together as a company quarterly","date":"2023-10-04T00:00:00.000Z","formattedDate":"October 4, 2023","tags":[{"label":"team","permalink":"/blog/tags/team"},{"label":"summer-health","permalink":"/blog/tags/summer-health"},{"label":"offsites","permalink":"/blog/tags/offsites"}],"readingTime":1.05,"hasTruncateMarker":true,"authors":[{"name":"Matthew Woo","imageURL":"https://github.com/matthewwoo.png","key":"matthewwoo"},{"name":"Lori Hutchek","imageURL":"https://github.com/eilinora.png","key":"eilinora"}],"frontMatter":{"slug":"company-q3-offsite-sonoma-2023","title":"Summer Health Q3 Offsite","description":"Why we gathering together as a company quarterly","authors":["matthewwoo","eilinora"],"tags":["team","summer-health","offsites"],"image":"/img/engineering-team.jpeg"},"nextItem":{"title":"Achieving 15-Minute Pediatrician Access","permalink":"/blog/workflow"}},"content":"![Engineering Team](./engineering-team.jpeg)\\n\\nOne of our core beliefs at Summer Health is that if we want do something as ambitious as to define a new standard of care we need our entire team to have **mission-driven empathy.** It is only with this mindset that we can create a compelling vision of what that world looks like, why it matters and **work backwards** on how we can make it reality.\\n\\n\x3c!-- truncate --\x3e\\n\\nThat\'s why for 4 days in September we brought the entire team across product, engineering, marketing and business operations to Sonoma where we:\\n\\n1. Learned from the history of telemedicine and discussed how we would not just build something better but transcend it\\n2. Defined what a 10 star experience for both our patients and the doctors\\n3. Participated in a brand workshop to help reinforce how we need to show up in the market and throughout our entire product experience.\\n\\n![Company Dinner](./company-dinner.jpeg)\\n\\nWhile it may seem like a huge time commitment for the entire team, offsites like this empower our team to see the big picture and consistently make the right micro decisions to help make our vision a reality.\\n\\nIt also doesn\'t hurt that we had fun cooking dinner together, making smores and wine tasting.\\n\\n![Wine Tasting](./wine-tasting.jpeg)"},{"id":"workflow","metadata":{"permalink":"/blog/workflow","source":"@site/blog/2023-08-31-workflow/index.md","title":"Achieving 15-Minute Pediatrician Access","description":"Our system design journey with workflow engine","date":"2023-08-31T00:00:00.000Z","formattedDate":"August 31, 2023","tags":[{"label":"workflow","permalink":"/blog/tags/workflow"},{"label":"system design","permalink":"/blog/tags/system-design"}],"readingTime":5.395,"hasTruncateMarker":true,"authors":[{"name":"Mimu Jung","imageURL":"https://github.com/mimu0.png","key":"mimu0"}],"frontMatter":{"slug":"workflow","title":"Achieving 15-Minute Pediatrician Access","description":"Our system design journey with workflow engine","authors":["mimu0"],"tags":["workflow","system design"],"image":"/img/blog-workflow.jpg"},"prevItem":{"title":"Summer Health Q3 Offsite","permalink":"/blog/company-q3-offsite-sonoma-2023"},"nextItem":{"title":"Why We Use MUI","permalink":"/blog/2023/08/23/why-we-use-mui"}},"content":"Imagine the peace of mind of being able to connect with a pediatrician within\\njust 15 minutes, around the clock, as a parent.\\nThat\'s exactly what we provide to our caregivers.\\nIn this blog post, I will describe how we designed the system to achieve this goal.\\n\\n\x3c!-- truncate --\x3e\\n\\n## The Challenge\\n\\nOur top priority is to promptly answer any questions or concerns\\nraised by caregivers. However, we understand that our providers may not always\\nbe available to respond immediately.\\nThis presented us with a challenge:\\nhow do we ensure quick response times while accommodating our providers\' availability?\\n\\n## The Solution: An Idle Monitoring System\\n\\nTo address this challenge, we developed an idle monitoring system that\\nenhances communication between caregivers and providers.\\nThis system operates according to a set of rules that automatically trigger\\nnotifications based on the duration of inactivity.\\n\\nLet\'s take a closer look at these rules:\\n\\n- **15-Minute Reminder:** After the last message from a caregiver,\\n  an SMS should nudge the provider.\\n- **30-Minute Alert:** If there\'s been no response for 30 minutes,\\n  an internal Slack notification should be sent to the operations team,\\n  initiating manual backup provider allocation.\\n- **60-Minute On-call Handover:** After a full hour of silence,\\n  the on-call provider should receive an SMS and take over the conversation.\\n\\n![Idle monitor](./idle-monitor.png)\\n\\n## The Initial Approach\\n\\nOur first design utilized [Cloud Tasks](https://cloud.google.com/tasks) to\\nschedule tasks. Here\'s how it worked:\\n\\n- When the idle window began, we scheduled a task to trigger an event in 15 minutes.\\n- Once the task timer fired, we checked the conversation\'s status and\\n  notified the provider accordingly.\\n- We performed a series of checks, such as fetching conversation messages and\\n  verifying if the conversation was indeed in the idle window.\\n- If confirmed, we sent a notification to the provider; otherwise, we skipped it.\\n- Complex calculations were required to determine when the idle window commenced.\\n\\n### Challenges Faced\\n\\nHowever, this initial approach brought about some challenges:\\n\\n- **Task Overload:** Multiple tasks were scheduled for various conversations,\\n  but most remained unused and ignored.\\n- **Resource-Intensive:** Upon task trigger, we had to fetch all conversation\\n  messages to determine if the conversation was idle.\\n  This proved resource-intensive and inefficient.\\n\\n## The New Design\\n\\nIn our quest to improve our idle monitoring system, we needed an easy way to\\nmanage state, timers, and retries. Enter workflow engines, the game-changer that\\nmet all our requirements.\\n\\n### The Power of Workflow Engines\\n\\n#### 1. Simplified State Management\\n\\nWorkflow engines provide isolated environments, simplifying state management.\\nEach workflow operates independently, making state management a breeze.\\n\\n#### 2. Effortless Timer Management\\n\\nWith workflow engines, timers become worry-free. Isolation ensures\\ntimers won\'t disrupt the application, enhancing precision and reliability.\\n\\n#### 3. Robust Retry Mechanisms\\n\\nWorkflow engines offer robust retry capabilities, ensuring system resilience.\\nWe can handle failures gracefully, maintaining system integrity.\\n\\n#### 4. Streamlined Code Maintenance\\n\\nWe separate state and timer code into distinct workflows,\\nsimplifying code maintenance, organization, and future improvements.\\n\\n### Visualizing Workflow Engine in Action\\n\\nWhen it came to choosing a workflow engine for our system,\\nwe opted for [Temporal](https://temporal.io) due to its dynamic features and user-friendly\\napproach in conceptualizing workflow engines.\\nLet\'s dive into the fundamental aspects of\\nTemporal that played a pivotal role in our implementation.\\n\\n#### Signals and Activities: Powering Workflow Execution\\n\\nIn Temporal, a `Signal` represents an event triggered by the application,\\nacting as an input for the workflow. Conversely, an `Activity` represents\\nan action that the workflow can execute on the application.\\nThese two elements serve as the backbone of our system,\\nenabling seamless interaction and coordination between the workflow and the application.\\n\\n#### Crafting a Simplified Workflow Interface\\n\\nTo encapsulate the logic of our idle monitoring system efficiently,\\nwe crafted a streamlined and uncluttered workflow interface.\\nBy keeping things simple, we established a solid foundation for managing the\\nflow and interactions within our system.\\n\\nHere\'s an example of how our workflow interface looks:\\n\\n```mermaid\\nflowchart LR\\n    subgraph Workflow Environment\\n    Workflow[\\"Workflow\\"]\\n    end\\n\\n    subgraph Signal\\n    onCaregiverMessageAdded-..-> Workflow\\n    onProviderMessageAdded-..-> Workflow\\n    end\\n\\n    subgraph Activity\\n    Workflow -..-> sendNudge[\\"send nudge\\"]\\n    Workflow -..-> sendAlert[\\"send alert\\"]\\n    Workflow -..-> sendOnCall[\\"send on-call\\"]\\n    end\\n```\\n\\nThis straightforward interface acts as a wrapper for the\\nidle monitoring system\'s logic, ensuring easy management and maintenance.\\n\\n#### Streamlining Workflow Logic\\n\\nTemporal excels in simplifying workflow logic. Within our workflow,\\nwe focused solely on tracking state changes and reacting to timers,\\nmaking the implementation straightforward and efficient.\\nBy abstracting the complexities of managing workflow execution and coordination,\\nTemporal empowered us to concentrate on the core functionality of our system.\\n\\n```mermaid\\nsequenceDiagram\\n    Note over Signal: onCaregiverMessageAdded\\n    Signal->>State: Update timestamp if it\'s empty\\n    Signal->>Timer: Start timer if state is empty\\n\\n    Note over Signal: onProviderMessageAdded\\n    Signal->>State: Clear timestamp\\n    Signal->>Timer: Clear timer\\n\\n    loop Timer\\n        Timer--\x3e>Timer: Trigger\\n        Note over Timer: Check timestamp\\n        Timer--\x3e>Activity: Send nudge\\n        Timer--\x3e>Activity: Send alert\\n        Timer--\x3e>Activity: Send on-call\\n    end\\n```\\n\\nBy harnessing Temporal\'s capabilities, we created a highly efficient and\\nstreamlined workflow engine that powers our idle monitoring system.\\nEasing the implementation process with its user-friendly approach,\\nTemporal allowed us to focus on delivering a reliable and effective solution.\\n\\n## Real-World Applications\\n\\nWorkflow engines have proven to be incredibly versatile,\\noffering benefits beyond just idle monitoring.\\nBy incorporating workflow engines into our system,\\nwe have not only optimized our processes but also unlocked new possibilities\\nfor efficient and resilient system design.\\n\\nLet\'s explore some real-world applications that we are currently using:\\n\\n**Long-Running Data Exports:**\\nWorkflow engines excel in managing complex data\\nexport tasks that require substantial time and resources.\\nBy leveraging the capabilities of a workflow engine,\\nwe can efficiently handle and track the progress of these lengthy data exports,\\nensuring their successful completion.\\n\\n**Data Quality Audits and Reconciliations:**\\nWorkflow engines provide a systematic approach to performing data quality\\naudits and reconciliations. With the ability to define and execute a series of\\nsteps, workflow engines enable us to validate data integrity, identify\\ndiscrepancies, and reconcile any inconsistencies quickly and accurately.\\n\\n**Idempotent Multi-Step Transactions:**\\nWorkflow engines are adept at handling multi-step transactions that need to be\\nexecuted reliably and idempotently. Whether it\'s managing subscription and\\nregistration processes or coordinating complex financial transactions,\\nworkflow engines ensure that each step is executed atomically, maintaining\\ndata consistency and preventing any unintended side effects.\\n\\n## Conclusion\\n\\nBy embracing workflow engines, we have not only optimized our existing system\\nbut also opened doors to new possibilities in designing efficient and\\nresilient systems. The versatility and flexibility of workflow engines make\\nthem indispensable tools in solving complex problems and orchestrating\\nintricate processes."},{"id":"/2023/08/23/why-we-use-mui","metadata":{"permalink":"/blog/2023/08/23/why-we-use-mui","source":"@site/blog/2023-08-23-why-we-use-mui/index.md","title":"Why We Use MUI","description":"How we are taking advantage of MUI","date":"2023-08-23T00:00:00.000Z","formattedDate":"August 23, 2023","tags":[{"label":"engineering","permalink":"/blog/tags/engineering"},{"label":"mui","permalink":"/blog/tags/mui"},{"label":"storybook","permalink":"/blog/tags/storybook"}],"readingTime":4.37,"hasTruncateMarker":true,"authors":[{"name":"Lori Hutchek","imageURL":"https://github.com/eilinora.png","key":"eilinora"}],"frontMatter":{"title":"Why We Use MUI","description":"How we are taking advantage of MUI","authors":["eilinora"],"tags":["engineering","mui","storybook"],"image":"/img/storybook-meta-card.png"},"prevItem":{"title":"Achieving 15-Minute Pediatrician Access","permalink":"/blog/workflow"},"nextItem":{"title":"A New Hire\'s Perspective- First Months at Summer Health","permalink":"/blog/new-hire-perspective"}},"content":"## A little history\\n\\nAs you\'ve read in our previous Summer Health Dev Blog post, Summer Health is an\\nearly-stage start-up whose goal is to simplify healthcare and provide better\\naccess to doctors for patients. When we first started building our applications\\nlast summer our main focus was to move quickly while building a base for the future.\\nAt first, tailwind seemed like the right choice. If offered us a simple CSS utility\\ninterface to build out pages quickly and easily. In addition, there are several\\nsites with well-documented tailwind recipes we were able to lean on. However, as\\ntime passed, we started to encounter issues with relying upon tailwind alone.\\n\\n\x3c!-- truncate --\x3e\\n\\n## Why we re-evaluated\\n\\nAs we continued to build, we began to notice a few issues. First, the pages of our\\nsite began to drift in design. On some pages, we began to notice small inconsistencies\\nin spacing and layout between sections of content. We began building components\\nto manage page sections but we wondered if there was a better way. The second, and\\nmore compelling reason we decided to re-evaluate, although there are component libraries\\nthat are built on tailwind (and we tried a few), we realized to move more quickly\\nand consistently we need an extensive component library we can easily theme. After\\nevaluating several options, MUI was the standout winner.\\n\\n## Choosing MUI\\n\\nIf you haven\'t heard of [MUI](https://mui.com/). MUI is a comprehensive and free\\nreact component library system that is built on the philosophy of Google Material\\nDesign. Their documentation is extensive and they offer demos with code examples\\nin their documentation to help you learn how to customize. Speaking of customization,\\ntheir theming system allows you to build your variants into the main theme system\\nso that we can build consistency across the application; while also offering a simple\\nway of doing overrides. One of the big plusses of going with MUI was its usage of\\nGoogle Material Design; although MUI does deviate from Material Design they are\\nworking towards consistency in the future. It allowed us to build a common language\\nbetween our engineering team and the design team. Which we\'ve used to create our\\napplications MUI theme.\\n\\n### Setting up our theme system\\n\\nAt Summer Health we use [nx](https://nx.dev/) to manage our applications codebase.\\nTo help make our design and component system accessible to various applications we\\ncreated a `ui` library to house our theme and components. Below I\'ll lay out how\\nwe intergraded our color system into our MUI theme.\\n\\nOur designers take advantage of Figma for building our designs. Material design,\\nlike many popular design systems, offers a [figma design kit](https://www.figma.com/community/file/1035203688168086460/Material-3-Design-Kit)\\nwe were able to take advantage of color and theme our components.\\n\\n![Figma color scheme](./colors-figma.png)\\n\\nWith it, we created a trimmed-down version based on our application needs with an\\neasy ability to expand.\\n\\nFrom here we were able to translate those colors into our MUI theme. Below is a\\nsnippet of our color theme.\\n\\n```javascript\\nimport { experimental_extendTheme as extendTheme } from \'@mui/material/styles\';\\n\\nexport const theme = extendTheme({\\n  // other customizations...\\n  sunrise: {\\n    light: {\\n      primary: {\\n        main: \'#FFC220\',\\n        onMain: \'#171515\',\\n        active: \'#F2A612\',\\n        onActive: \'#171515\',\\n        focus: \'#FFC220\',\\n        onFocus: \'#171515\',\\n        focusBorder: \'#F2A612\',\\n        disabled: \'#F2E2C4\',\\n        onDisabled: \'#171515\',\\n      },\\n      secondary: {\\n        main: \'#F2E2C4\',\\n        onMain: \'#171515\',\\n        active: \'#F5DAA7\',\\n        onActive: \'#171515\',\\n        focus: \'#F5DAA7\',\\n        onFocus: \'#171515\',\\n        focusBorder: \'#F2E2C4\',\\n        disabled: \'#F2E2C4\',\\n        onDisabled: \'#171515\',\\n      },\\n      // other color palette options...\\n    },\\n  },\\n});\\n```\\n\\nNow that our color system has been set up we can then translate that into our components.\\n\\n![Figma buttons](./buttons-figma.png)\\n\\nBelow is an example of how we translated our color scheme into our button components.\\n\\n```javascript\\nexport const theme = extendTheme({\\n  // other customizations...\\n  components: {\\n    MuiButton: {\\n      defaultProps: {\\n        disableElevation: true,\\n      },\\n      styleOverrides: {\\n        root: ({ theme, ownerState }) => ({\\n          ...TypographySunrise[\'label.medium\'],\\n          backgroundColor: `var(--mui-sunrise-${theme.palette.mode}-${ownerState.color}-main)`,\\n          color: `var(--mui-sunrise-${theme.palette.mode}-${ownerState.color}-onMain)`,\\n          border: `2px solid var(--mui-sunrise-${theme.palette.mode}-${ownerState.color}-main)`,\\n          \':hover\': {\\n            backgroundColor: `var(--mui-sunrise-${theme.palette.mode}-${ownerState.color}-active)`,\\n            color: `var(--mui-sunrise-${theme.palette.mode}-${ownerState.color}-onActive)`,\\n            border: `2px solid var(--mui-sunrise-${theme.palette.mode}-${ownerState.color}-active)`,\\n          },\\n          \':focus\': {\\n            backgroundColor: `var(--mui-sunrise-${theme.palette.mode}-${ownerState.color}-focus)`,\\n            color: `var(--mui-sunrise-${theme.palette.mode}-${ownerState.color}-onFocus)`,\\n            border: `2px solid var(--mui-sunrise-${theme.palette.mode}-${ownerState.color}-focusBorder)`,\\n          },\\n          \':disabled\': {\\n            backgroundColor: `var(--mui-sunrise-${theme.palette.mode}-${ownerState.color}-disabled)`,\\n            color: alpha(\\n              theme.sunrise[theme.palette.mode][ownerState.color].onFocus,\\n              0.38,\\n            ),\\n            border: `2px solid var(--mui-sunrise-${theme.palette.mode}-${ownerState.color}-disabled)`,\\n          },\\n        }),\\n      },\\n    },\\n    // other customizations...\\n});\\n```\\n\\n## Documentation\\n\\nWith our themes and components configured, we needed a way to share that with our\\nengineers and our designers. In comes Storybook for the assist! [Storybook](https://storybook.js.org/)\\nAs their website states; Storybook offers developers a way of building UI components\\nin isolation and while doing so provides a way to build documentation. We\'ll be\\ntalking more about how we build components, and take advantage of Storybook, in a\\nfuture blog post.\\n\\nThanks to Storybook we have been able to provide a story sharing our color styles\\nand their definition with our cross-functional team.\\n\\n![Colors](./colors.png)\\n\\nWe are also able to showcase our various button variants.\\n\\n![Buttons](./buttons.png)\\n\\n## Wrapping up\\n\\nTailwind has been growing in popularity and can offer engineering teams a way of\\nquickly building out scalable efficient pages. However, MUI offers a highly customizable\\ntheming system to build consistent layouts with an extensive library of prebuilt\\ncomponents that have allowed us to build our latest features quickly and consistently.\\n\\n## Additional reading material\\n\\n- [Material Design Styles](https://m3.material.io/styles)\\n- [Why Storybook](https://storybook.js.org/docs/react/get-started/why-storybook)\\n- [Material UI - Overview](https://mui.com/material-ui/getting-started/)\\n- [A guide to material design with react](https://blog.logrocket.com/guide-material-design-react/)\\n- [Material UI Vs Tailwind CSS](https://blog.openreplay.com/material-ui-vs-tailwind-css/#:~:text=Theming%3A%20Material%20UI%20provides%20powerful,editing%20the%20classes%20upon%20usage.)"},{"id":"new-hire-perspective","metadata":{"permalink":"/blog/new-hire-perspective","source":"@site/blog/2023-08-16-new-hire-perspective/index.md","title":"A New Hire\'s Perspective- First Months at Summer Health","description":"New hire\'s perspective into Summer Health\'s mission and Teamwork at Summer Health","date":"2023-08-16T00:00:00.000Z","formattedDate":"August 16, 2023","tags":[{"label":"team","permalink":"/blog/tags/team"},{"label":"engineering","permalink":"/blog/tags/engineering"},{"label":"healthcare-tech","permalink":"/blog/tags/healthcare-tech"}],"readingTime":4.78,"hasTruncateMarker":true,"authors":[{"name":"Rachel Kim","imageURL":"https://github.com/RachMKim.png","key":"RachMKim"},{"name":"ChatGPT","url":"https://chat.openai.com/","imageURL":"https://chat.openai.com/apple-touch-icon.png","key":"chatgpt"}],"frontMatter":{"slug":"new-hire-perspective","title":"A New Hire\'s Perspective- First Months at Summer Health","description":"New hire\'s perspective into Summer Health\'s mission and Teamwork at Summer Health","authors":["RachMKim","chatgpt"],"tags":["team","engineering","healthcare-tech"],"image":"/img/rachel-new-hire-perspective-social-card.png"},"prevItem":{"title":"Why We Use MUI","permalink":"/blog/2023/08/23/why-we-use-mui"},"nextItem":{"title":"A Better Healthcare Experience","permalink":"/blog/2023/08/10/care-os"}},"content":"![Summer Health Engineering Banner](./rachel-banner.png)\\n\\n# Embarking on a Transformative Journey\\n\\nFour months ago, I embarked on a new adventure, transitioning from the world of classical violin to the dynamic realm of healthcare technology at Summer Health. The mixture of excitement and uncertainty was palpable. Today, I\'m thrilled to share my reflections on my journey at Summer Health, giving you a glimpse into the extraordinary Engineering Team I\'ve been fortunate to collaborate with.\\n\\n\x3c!--truncate--\x3e\\n\\n## Our Purpose: Simplifying Pediatric Care\\n\\n![Mission](./mission.jpg)\\n\\n> At Summer Health, we\'re dedicated to making pediatric care as simple as sending a text message. Our mission revolves around providing innovative solutions that empower parents to navigate caregiving challenges with ease, driven by empathy to reduce stress and enhance well-being.\\n\\n## Fostering Innovation\\n\\n**Unleashing Creativity**: The Engineering Team at Summer Health embodies a culture of innovation. Each team member is committed to crafting solutions for caregivers and providers providing them practical tools that simplify their roles. Our work revolves around exploring fresh ideas and igniting creativity, all fueled by our shared passion to reshape pediatric care.\\n\\n## The \\"Wizard\\" Team\\n\\n![The Tech Wizards](./wizard.jpg)\\n\\nAs I set forth on my journey, I resonated with Summer Health\'s mission, yet a twinge of uncertainty accompanied my thoughts about the team that lay ahead, shadowed by the question, \\"What if?\\" In hindsight, I\'m thrilled to declare that my concerns were completely misplaced. Not only have I had the privilege of collaborating with immensely skilled individuals rich in knowledge, but I\'ve also been fortunate to share my workdays with truly authentic people. I often fondly refer to them as \\"wizards,\\" not because they wield magic, but due to their remarkable knack for conjuring ingenious solutions seemingly out of thin air.\\n\\n**Jose, Head of Engineering**: Jose\'s role and expertise serve as a constant source of inspiration for me. As our Head of Engineering, he consistently sets high standards, motivating me to pursue excellence. His blend of technical brilliance and genuine kindness is a remarkable force. Jose\'s visionary problem-solving and adept management set him apart as a mentor who excels both professionally and personally. His forward-thinking approach is invaluable; he not only addresses our current challenges but also envisions future growth. Under his leadership, I\'ve obtained invaluable lessons and am deeply grateful for his guidance. My aspiration is to follow his example, aiming to become a role model like him someday.\\n\\n**Lori, Founding Engineer**: Lori\'s kindness is matched only by her technical brilliance. Her exceptional skills often leave me in awe. Observing her journey from inception to mastery has been inspiring. To illustrate her impact, when faced with a challenge where even search engines and AI couldn\'t provide an answer, Lori\'s seamless resolution showcased her exceptional abilities. Her guidance as a mentor goes beyond the ordinary; she consistently goes above and beyond to support my growth. Lori\'s genuine character shines through in every interaction, and her steadfast presence is a true blessing in my professional journey.\\n\\n**Mimu, Founding Engineer**: Mimu redefines healthcare through ingenious solutions. His groundbreaking integration of LLM into CareOS, our provider-facing application, goes beyond just streamlining medical note-taking processes; it elevates the quality of healthcare delivery. Mimu\'s strategic acumen and technical excellence are driving forces behind the development of impactful solutions that directly contribute to our mission of simplifying pediatric care. What\'s truly remarkable is Mimu\'s commitment to going above and beyond to uncover innovative solutions.\\n\\n## My Journey of Growth\\n\\n![Journey](./journey.png)\\n\\nMy journey at Summer Health has been a blend of learning, innovation, and teamwork. Going from the world of violins to healthcare brought its share of challenges and victories. Guided by a team that thrives on pushing boundaries, we\'re collectively shaping pediatric care, and I couldn\'t be more thankful for the experience.\\n\\n**Professional and Personal Growth**\\n\\nAs the days turned into weeks, I saw significant growth in myself. Almost four months in, I\'ve become more adept at navigating the codebase, understanding our system\'s architecture, writing clean code that adheres to our conventions, and actively contributing to our project\'s advancement. This transformation speaks volumes about the environment of continuous learning fostered by the team.\\n\\nOne crucial lesson I\'ve learned is that there are no questions or ideas too small. This mindset nurtures a supportive atmosphere where we encourage each other\'s growth. I\'m constantly learning from their collective wisdom, and their guidance has played an integral role in my development.\\n\\nFrom day one, the team has provided unwavering support. Whether it\'s equipping me with the right tools or helping me overcome coding challenges during our paired sessions, their assistance has created a culture where seeking help is natural. This network has not only accelerated my learning but also boosted my confidence in tackling any challenge.\\n\\n**Unity in Facing Challenges**\\n\\nThe sense of unity within the Engineering Team is a testament to our shared vision. Challenges are met with a determination that consistently leads to innovative solutions. This team has not only taught me about healthcare technology but also demonstrated the power of teamwork in overcoming obstacles.\\n\\n**Acknowledgments and Gratitude**\\n\\nMy heartfelt thanks go out to everyone at Summer Health, from colleagues who welcomed me warmly to mentors who generously shared their knowledge. The collective effort of this exceptional team has made my onboarding experience incredibly positive. I\'m also grateful to Summer Health for providing me the opportunity to be part of a mission-driven team.\\n\\n## Embracing the Future\\n\\n![Growth](./growth.png)\\n\\nReflecting on my decision to join Summer Health, it\'s clear that this journey has been transformative. The alignment of values, the collaborative atmosphere, and the ample avenues for growth reassure me that I\'ve found my place. With enthusiasm, I look forward to contributing to the ongoing story of innovation and compassion.\\n\\n[Discover more about Summer Health on our website.](https://www.summerhealth.com)"},{"id":"/2023/08/10/care-os","metadata":{"permalink":"/blog/2023/08/10/care-os","source":"@site/blog/2023-08-10-care-os/index.md","title":"A Better Healthcare Experience","description":"How we\'re building a world-class healthcare experience for pediatricians and parents","date":"2023-08-10T00:00:00.000Z","formattedDate":"August 10, 2023","tags":[{"label":"engineering","permalink":"/blog/tags/engineering"},{"label":"fhir","permalink":"/blog/tags/fhir"},{"label":"ai-assisted","permalink":"/blog/tags/ai-assisted"}],"readingTime":3.235,"hasTruncateMarker":true,"authors":[{"name":"Jose Rodriguez","imageURL":"https://github.com/jrodbeta.png","key":"jrodbeta"},{"name":"ChatGPT","url":"https://chat.openai.com/","imageURL":"https://chat.openai.com/apple-touch-icon.png","key":"chatgpt"}],"frontMatter":{"title":"A Better Healthcare Experience","description":"How we\'re building a world-class healthcare experience for pediatricians and parents","authors":["jrodbeta","chatgpt"],"tags":["engineering","fhir","ai-assisted"],"image":"/img/careos-social-card.png"},"prevItem":{"title":"A New Hire\'s Perspective- First Months at Summer Health","permalink":"/blog/new-hire-perspective"},"nextItem":{"title":"Summer Health Engineering","permalink":"/blog/summer-health-engineering"}},"content":"Every pediatrician knows the strain of a cluttered and convoluted Electronic\\nHealth Record (EHR) system. The age-old EHR systems, teeming with irrelevant\\nfields and buttons, can bring back painful memories. What exacerbates this is\\nthat these traditional EHRs are focused on appointments and billing\\ninstead of being focused on providing care.\\n\\nSummer Health focuses on direct-to-consumer care that\'s available around the\\nclock. We\'re not just streamlining healthcare for parents; we\'re tailoring it\\nfor the pediatricians so they can provide the highest quality care without\\nbeing burdened by outdated tech.\\n\\n\x3c!-- truncate --\x3e\\n\\nWe envision a healthcare experience that enables quality care without\\nsacrificing simplicity and security. From this vision, CareOS was born. However,\\ncreating a new healthcare experience from the ground up takes a lot of work,\\nand we\'re not interested in reinventing the wheel. This post covers some core\\nconcepts that were and continue to be important to us as we build a world-class\\nhealthcare experience.\\n\\n## The Right Foundation\\n\\nThe fastest way to a skeptical look is by telling someone you\'re going\\nto build an EHR from scratch. It\'s a daunting task, and skepticism is warranted.\\nThat\'s why while we knew we needed a better experience for our pediatricians,\\nbuilding everything from scratch wasn\'t the right approach. We explored different\\nheadless and headed options, weighing the limitations and expenses. We needed the\\nflexibility to build a custom experience without committing to a future operational\\nnightmare.\\n\\nThat\'s where Medplum came into play. Developer-friendly and forward-thinking,\\nMedplum\'s healthcare platform resonated with our vision and allowed us\\nto build a high quality experience without starting from 0.\\n\\n## Identity Management\\n\\nBeing a seed-stage company, Summer Health must keep the identities involved in\\nhealthcare flexible. As we evolve and uncover new product dimensions, there\'s a\\npressing need for adaptability. Yet, security remains paramount and clinical\\ndata access needs to be restricted only to pertinent entities.\\n\\nRecognizing this, we aimed for a healthcare platform that offers flexible\\n[identity management](https://www.medplum.com/docs/auth). So\\nwhether it\u2019s a Summer Health employee, a partnering practitioner or a parent,\\nwe can operate in one environment under one auth umbrella.\\n\\n## Access Control\\n\\nFiguring out identity management was just the tip of the iceberg. Pediatrics has\\na unique challenge in terms of data access. Unlike other specialties, a\\npediatric patient\'s clinical data must be accessible by different identities,\\nlike parents or guardians. So, how do we ensure that the right individuals have\\nthe correct access while ensuring the confidentiality and integrity of the data?\\nThis complexity needs a\\n[nuanced approach to access control](https://www.medplum.com/docs/auth/access-control),\\nand we needed a platform with an answer.\\n\\n## Everything is on FHIR \ud83d\udd25\\n\\nOur vision was broader than the present. We knew our data storage methods\\ntoday would impact future interoperability with partners and other healthcare\\nsystems. This led us to FHIR (Fast Healthcare Interoperability Resources), a\\nstandard framework for clinical data storage. Adopting FHIR meant ensuring our\\ndata remains legible outside the confines of Summer Health, promising a brighter\\nfuture for our patients and their relationships with other clinical entities.\\n\\n## Mobile First\\n\\nOur pediatricians, much like our parents, rely on mobile devices. The availability\\nof Summer Health across the US, every single day of the week, 24 hours a day, is\\nrooted in mobile accessibility. It\'s pivotal for our pediatricians to\\nprovide uninterrupted, high-quality care, irrespective of their location.\\nWe wanted to craft a user-friendly, mobile-first experience for them, ensuring\\nthey have all the necessary information at their fingertips to provide\\nthe highest quality care.\\n\\n![CareOS screenshots](./care-os-screenshots.png)\\n\\n## More to Come\\n\\nSummer Health\u2019s path to revolutionize pediatric care starts with ensuring our\\npediatricians have the best tools to provide the best care. We\u2019ll continue to\\nshare more about how we\u2019re building CareOS as we continue this journey. In the\\nmeantime, you can learn more details about our integration with Medplum in the\\ncase study:\\n[24/7 Pediatrician Access - Summer Health Case Study](https://www.medplum.com/blog/summer-case-study)"},{"id":"summer-health-engineering","metadata":{"permalink":"/blog/summer-health-engineering","source":"@site/blog/2023-08-05-summer-health-engineering/index.md","title":"Summer Health Engineering","description":"About our engineering team","date":"2023-08-05T00:00:00.000Z","formattedDate":"August 5, 2023","tags":[{"label":"team","permalink":"/blog/tags/team"},{"label":"engineering","permalink":"/blog/tags/engineering"},{"label":"ai-assisted","permalink":"/blog/tags/ai-assisted"}],"readingTime":2.32,"hasTruncateMarker":true,"authors":[{"name":"Jose Rodriguez","imageURL":"https://github.com/jrodbeta.png","key":"jrodbeta"},{"name":"ChatGPT","url":"https://chat.openai.com/","imageURL":"https://chat.openai.com/apple-touch-icon.png","key":"chatgpt"}],"frontMatter":{"slug":"summer-health-engineering","title":"Summer Health Engineering","description":"About our engineering team","authors":["jrodbeta","chatgpt"],"tags":["team","engineering","ai-assisted"],"image":"/img/summer-health-social-card.png"},"prevItem":{"title":"A Better Healthcare Experience","permalink":"/blog/2023/08/10/care-os"}},"content":"![Summer Health Engineering Banner](./summer-health-banner.png)\\n\\nAt Summer Health, we\'re reinventing the world of pediatric care with a unique\\nvision: to place a doctor in every parent\'s pocket. With an innovative platform\\nthat connects parents to a pediatrician within 15 minutes, our commitment to\\nhealthcare is as uncomplicated as sending a text message. This formidable\\nchallenge of integrating healthcare, technology, and convenience presents our\\nteam with a wealth of engineering problems. However, our growth-minded,\\nproblem-solving approach helps us continually rise to these challenges.\\n\\n\x3c!-- truncate --\x3e\\n\\n## Our Growth Mindset\\n\\nCentral to our engineering team\'s philosophy is a strong growth mindset.\\nEverything we do is focused on continual improvement - whether it\'s our\\nprocesses, our technology stack, conventions, or even our team dynamics.\\nEvery team member is encouraged to contribute to this process of evolution.\\nFrom refining code, streamlining workflows or reducing meeting redundancies,\\nevery bit helps to ensure we operate at peak efficiency.\\n\\n## Problem Solvers, Not Just Delivery Engineers\\n\\nAnother key aspect that sets us apart is that we are not just \\"delivery engineers\\"\\n\u2013 we\'re a problem-solving team. Our engineers play an integral role in the\\ncreative process, defining, understanding, and formulating solutions for the\\nchallenges we face. This mindset takes us beyond simply delivering a product;\\nit turns us into innovators, continually reshaping our approach to ensure we\\nprovide the best pediatric care.\\n\\n## Diversity and Inclusion\\n\\nWe believe in the power of diversity and inclusivity. We strive to create an\\nenvironment where all team members can show up as their authentic selves,\\ncontribute their unique perspectives, and feel valued. Our team members\'\\ndiverse backgrounds and thoughts are not just appreciated - they\'re essential\\nto our success. The richness of ideas, viewpoints, and experiences that stem\\nfrom this diversity fosters innovation, drives creativity, and enables us to\\nsolve complex problems in novel ways.\\n\\n## High Collaboration, High Iteration\\n\\nOur day-to-day is highly collaborative and iterative. We implement practices\\nlike continuous integration, continuous delivery, and continuous deployment,\\nencouraging engineers to merge multiple items to production daily. By breaking\\ndown features into smaller increments, we can rally around similar goals,\\naccelerating our critical path quickly.\\n\\nPair programming is a cornerstone of our team culture, and we also place\\nimmense value on internal documentation to help each other understand ideas\\nand align on conventions. We\'re always seeking ways to improve our productivity,\\nand often, this means turning convention into automation so we can focus on\\nthe problems that matter most.\\n\\n## Into the Future\\n\\nAt Summer Health, we\'re leveraging technology and teamwork to transform pediatric\\ncare, bringing it to parents\' fingertips. Our growth-minded, problem-solving\\nengineering team is at the heart of this revolution, driving us forward, one\\nline of code at a time. We\'re not just writing software; we\'re writing the\\nfuture of pediatric care!"}]}')}}]);