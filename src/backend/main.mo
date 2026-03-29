import Int "mo:core/Int";
import Text "mo:core/Text";
import Time "mo:core/Time";
import List "mo:core/List";
import Order "mo:core/Order";
import Array "mo:core/Array";

actor {
  type Review = {
    name : Text;
    rating : Nat;
    comment : Text;
    date : Time.Time;
  };

  type Booking = {
    name : Text;
    phone : Text;
    date : Text;
    time : Text;
    guests : Nat;
  };

  type OrderCallback = {
    name : Text;
    phone : Text;
    items : Text;
  };

  module Review {
    public func compare(r1 : Review, r2 : Review) : Order.Order {
      Int.compare(r2.date, r1.date);
    };
  };

  let initialReviews = [
    {
      name = "Alice";
      rating = 5;
      comment = "Great food!";
      date = Time.now() - 10000000;
    },
    {
      name = "Bob";
      rating = 4;
      comment = "Nice ambiance.";
      date = Time.now() - 20000000;
    },
  ];

  let reviewsList = List.fromArray<Review>(initialReviews);

  let bookingsList = List.empty<Booking>();
  let ordersList = List.empty<OrderCallback>();

  public shared ({ caller }) func addReview(name : Text, rating : Nat, comment : Text) : async () {
    if (rating < 1 or rating > 5) { return };

    let review = {
      name;
      rating;
      comment;
      date = Time.now();
    };

    reviewsList.add(review);
  };

  public shared ({ caller }) func bookTable(name : Text, phone : Text, date : Text, time : Text, guests : Nat) : async () {
    let booking = { name; phone; date; time; guests };
    bookingsList.add(booking);
  };

  public shared ({ caller }) func requestOrderCallback(name : Text, phone : Text, items : Text) : async () {
    let order = { name; phone; items };
    ordersList.add(order);
  };

  public query ({ caller }) func getReviews() : async [Review] {
    reviewsList.toArray().sort();
  };

  public query ({ caller }) func getBookings() : async [Booking] {
    bookingsList.toArray();
  };

  public query ({ caller }) func getOrderCallbacks() : async [OrderCallback] {
    ordersList.toArray();
  };
};
