import {
  HomePage,
  SigninPage,
  SignupPage,
  FeaturedBooksPage,
  BookDetailPage,
  AboutPage,
  FaqPage,
  TopRatedPage,
  PopularBooksPage,
  ForgotPasswordPage,
  ForgotPasswordSuccessPage,
  ConfirmPasswordPage,
  ConfirmPasswordSuccessPage,
  MyProfilePage,
  CreateClubPage,
  ClubPage,
  MeetingPage,
  SettingPage,
  EmailSettingPage,
  MemberAlreadyBooksPage,
  MemberWantToReadBooksPage,
  MessagePage,
  AddBookPage,
  CreateMeetingPage,
  ClubAlreadyBooksPage,
  EditMeetingPage,
  MemberSettingPage,
  InvitationPage,
  NotificationPage,
  BookInspirationPage,
  ClubSuccessPage,
  PollPage,
  CreatePollPage,
  EditPollPage
} from 'components/pages';

export default function routes() {
  return {
    indexRoute: {
      component: HomePage
    },
    childRoutes: [
      {
        path: "/",
        component: HomePage
      },
      {
        path: "/signin",
        component: SigninPage
      },
      {
        path: "/signup",
        component: SignupPage
      },
      {
        path: "/forgot-password",
        component: ForgotPasswordPage
      },
      {
        path: "/forgot-password/success",
        component: ForgotPasswordSuccessPage
      },
      {
        path: "/confirm-password/:uid/:token",
        component: ConfirmPasswordPage
      },
      {
        path: "/confirm-password/success",
        component: ConfirmPasswordSuccessPage
      },
      {
        path: "/books",
        component: FeaturedBooksPage
      },
      {
        path: "/top-rated-books",
        component: TopRatedPage
      },
      {
        path: "/most-popular-books/:month/:year",
        component: PopularBooksPage
      },
      {
        path: "/books/:id",
        component: BookDetailPage
      },
      {
        path: "/about",
        component: AboutPage
      },
      {
        path: "/faqs",
        component: FaqPage
      },
      {
        path: "/profile/:id",
        component: MyProfilePage
      },
      {
        path: "/create-club",
        component: CreateClubPage
      },
      {
        path: "/profile/:id/settings",
        component: SettingPage
      },
      {
        path: "/profile/:id/email-settings",
        component: EmailSettingPage
      },
      {
        path: "/profile/:id/already-read-books",
        component: MemberAlreadyBooksPage
      },
      {
        path: "/profile/:id/want-to-read-books",
        component: MemberWantToReadBooksPage
      },
      {
        path: "/book/:type",
        component: AddBookPage
      },
      {
        path: "/clubs",
        component: ClubPage
      },
      {
        path: "/create-club/:id/success",
        component: ClubSuccessPage
      },
      {
        path: "/clubs/:id/meetings",
        component: MeetingPage
      },
      {
        path: "/clubs/:id/create-meeting",
        component: CreateMeetingPage
      },
      {
        path: "/clubs/:id/meetings/:mid",
        component: EditMeetingPage
      },
      {
        path: "/clubs/:id/create-poll",
        component: CreatePollPage
      },
      {
        path: "/clubs/:id/polls/:pid",
        component: EditPollPage
      },
      {
        path: "/clubs/:id/already-read-books",
        component: ClubAlreadyBooksPage
      },
      {
        path: "/clubs/:id/book-inspiration",
        component: BookInspirationPage
      },
      {
        path: "/clubs/:id/messages",
        component: MessagePage
      },
      {
        path: "/clubs/:id/polls",
        component: PollPage
      },
      {
        path: "/clubs/:id/settings",
        component: MemberSettingPage
      },
      {
        path: "/clubs/:id/join/:code",
        component: InvitationPage
      },
      {
        path: "/members/:memberId/:path/:type",
        component: NotificationPage
      },
      {
        path: "/:path/:clubId/meetings/:meetingId/rsvp",
        component: NotificationPage
      },
      {
        path: "/:path/:bookId/votes/:rating",
        component: NotificationPage
      }
    ]
  };
}
