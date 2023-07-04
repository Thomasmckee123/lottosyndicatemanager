# syndicate lotto manager application
## Overview

This application serves as a manager for various lottery syndicates. It allows users to create syndicates and establish their own rules such as defining minimum and maximum contributions, setting the syndicate as public or private, outlining how funds are distributed percentage-wise, and determining the contribution cutoff date. Users also have the option to enable or disable voting within the syndicate, voting will be used for important descisions, for example keeping the winnings in a pool to buy more lotto tickets, or splitting the winnings.

Once a user creates a syndicate, it becomes accessible for other users to join or request membership. The syndicate owner, who also acts as the moderator, retains the right to invite other users. They can also play various roles, including promoting syndicate members to higher levels of authority, further enhancing the interactive dynamics of the group, and if necessary, removing members.

users of this application have the ability to join or request to join multiple syndicates, subject to the group rules. They can opt in or out of contributing to draws and decide on the amount they wish to invest in a particular draw. Rewards are then distributed according to their respective contributions.

Key features of the application include:

Communication: Users can communicate within their respective syndicates, fostering a sense of community and collaboration.
Live Lotto Results: Users can access a live stream of lotto results in a separate chat. If voting is enabled by the moderator, contributors can decide whether to reinvest the winnings into more tickets or to distribute the winnings among themselves.
Reviews: Users can leave reviews on the syndicates they have been part of for a minimum of one week (to prevent hit-and-run reviewing) and after contributing to at least one draw.
Automatic Payments: Users can set up an automatic payments system to facilitate contributions whenever a specific draw happens in a particular group.
Identification: For legal compliance, users will be required to provide valid identification.
Profile Customization: An integrated camera feature allows users to personalize their profile with pictures and syndicate groups to set unique cover photos.
cash bonuses: To stimulate people to buy more tickets, cash rewards will be given to groups with the highest win rates

## problem definition
Lottery pools often face numerous challenges, as outlined by sources like the Health Lottery. With substantial sums of money involved, there's always a heightened risk of unscrupulous individuals attempting to defraud other participants. This risk has precipitated several lawsuits, revolving around disputes such as participant inclusion, correct number selection, ticket purchase authenticity, group or private ticket procurement, among others. There have been instances of deceitful pool managers who collected funds for lottery pools, but absconded with the cash without buying the intended tickets. Measures to prevent such conduct are currently insufficient.

Setting up a lottery syndicate typically requires a manager responsible for controlling group activities. Traditional duties of a manager include collecting money, purchasing tickets, managing the prize money, and distributing winnings. This responsibility necessitates extensive record keeping and can lead to errors, particularly in larger groups.

Another prevalent issue with lottery pools is the division of prize money among participants, which often results in smaller winnings per individual. Some lottery pools introduce a shares system, where your contribution directly impacts your potential winnings: the more you contribute, the higher your share of the prize.

Trust is another key issue in lottery pools. To ensure safety, every participant who contributes should receive a copy of the purchased tickets, mitigating the risk of false claims. However, it's inconvenient and time-consuming to conduct due diligence on moderators or members within a pool, which involves conducting background checks and scouring the internet for information about them. A centralized hub providing information on individual's past dealings would be immensely beneficial for transparency.

Timely payment from individual participants is another significant issue plaguing many lottery pools.

Additional problems become evident when reviewing large syndicates like the Lotter. Participants often express concerns about ticket security. Once you pay, the syndicate owns the ticket, leaving room for potential denials of your rightful claim.

## Requirements
I will use the MoSCoW prioritization technique for managing the requirements, M - must have, S- Should have, C- Could have, W- Will not have.

### Must have

.A user must be able to log on


.A user must be able to customise their own profile  

.A user must be able to use the camera to take photos

.A user must be able to create their own syndicate

.A moderator must be able to make their syndicate private or public

.A moderator  must be able to customise their syndicate

.A moderator must be able to  invite members to their syndicate .

.A user must be able to search for syndicates to join

.A user must be able to request to join private syndicates

.A user must be able to join public syndicates

.A user must be able to communicate with other syndicate members

.A member must be able to contribute towards a draw

.A user must be able to join multiple syndicates

.A member must contribute a limit set by the moderator

.A member must be able to opt in or out of draws

.A member must be able to leave a group

.A member must be able to leave reviews 

.A user must be able to access this application on the web or their phone

.A user must be able to view any syndicate's reviews 

### Should have
.A moderator should be able to customise their syndicate’s rules

.A user must be able to receive the percentage of what they contributed to the tickets from the rewards

.A user should be able to vote whether to carry on holding the winnings to buy more tickets, or receive winnings

.A moderator should be able to promote users to different positions within their syndicate

.A user should have access, and be able to search for live lotto results

.A member must only be able to review a group, after a week, and contributing to a draw

### Could have
.A syndicate will record their win loss history, and total profits

.A user will be able to view their win/loss history and total profits

.A member could be able to enter another chat, with anyone who bought tickets

.A member could be able to live stream the lottery results within that chat

.A user could have to produce identification in order to verify their login details

.A member could receive a copy of the lotto tickets bought

.A user could download the application on their phone

.A user could be able to set up automatic payments to particular draws

### Will not have
.The system won’t have it’s own payment method, it will need to use stripe

.The system won’t give out rewards for the groups with highest win rates
