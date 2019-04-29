import { assert } from 'chai';
import Brick from '../src/brick';
import { Eventual, Option } from '../src/utils';

describe('Foreman Examples', () => {
  // The examples show how the Brick pattern can be used as an alternative to the DI pattern in the
  // toy example of a MovieLister, used by Martin Fowler in
  // [his seminal article on DI](http://martinfowler.com/articles/injection.html)
  describe('MovieLister', () => {
    const MovieLister = Brick.create({
      args: ['movies', 'director'],
      fn(args) {
        // Simply search the movies array for movies directed by the given director.
        // Don't worry about where the list of movies comes from!
        return args.movies.filter(movie => movie.director == args.director);
      },
    });

    // A static list of all movies used by some tests...
    const allMovies = [
        {
          name: "Pulp Fiction",
          director: "Quentin Tarantino",
        },
        {
          name: "Lock, Stock and Two Smoking Barrels",
          director: "Guy Ritchie",
        },
        {
          name: "Reservoir Dogs",
          director: "Quentin Tarantino",
        },
    ];

    it("Provides movies by a director when the client directly provides the list", () => {
      const tarantinoMovies = MovieLister.fn({
        movies: allMovies,
        director: "Quentin Tarantino",
      });

      assert.deepEqual(tarantinoMovies, [
        {
            name: "Pulp Fiction",
            director: "Quentin Tarantino",
        },
        {
            name: "Reservoir Dogs",
            director: "Quentin Tarantino",
        },
      ]);
    });

    it("Reusability: Allows creating a new component that *always* lists movies by Quentin Tarantino \
              regardless of where the list comes from", () => {
      const TarantinoMovieLister = MovieLister.bind({ director: "Quentin Tarantino" });

      // The client that uses the `TarantinoMovieLister` now does not need (and indeed cannot) provide
      // the director name. The component will automatically always search for Tarantino's movies in
      // any list that it gets as the last dependency.
      assert.deepEqual(TarantinoMovieLister.args, ["movies"]);
      const tarantinoMovies = TarantinoMovieLister.fn({ movies: allMovies });

      assert.deepEqual(tarantinoMovies, [
        {
            name: "Pulp Fiction",
            director: "Quentin Tarantino",
        },
        {
            name: "Reservoir Dogs",
            director: "Quentin Tarantino",
        },
      ]);
    });

    it("Composability: Allows creating a new component that *always* gets the movie list from another \
              component", () => {
      // This implementation of the movie finder simply returns a canned set of movies.
      // However, other implementations could just as well read the list from a comma-separated file
      // or by hitting a remote service are possible!
      const CannedMovieFinder = Brick.create({
        args: [],
        fn() {
          return [
            {
                name: "Pulp Fiction",
                director: "Quentin Tarantino",
            },
            {
              name: "The Imitation Game",
              director: "Morten Tyldum",
            },
          ];
        },
      });

      // This component will now always search the canned list provided by the `CannedMovieFinder` for
      // movies directed by the specified director! This is guaranteed to always invoke the
      // `CannedMovieFinder` component on every call to the `CannedLister`.
      // This also shows how the original implementation of the `MovieFinder` is reused, as well as
      // how the original implementation is fully decoupled from knowing how to access the list that
      // it should search.
      // This is the main difference to a dependency injection oriented approach; in that case, the
      // original component must become coupled to an interface that specifies how the component will
      // obtain the list of movies.
      const CannedLister = MovieLister.compose({ movies: CannedMovieFinder });

      assert.deepEqual(CannedLister.args, ["director"]);
      assert.deepEqual(
          CannedLister.fn({ director: "Quentin Tarantino" }),
          [ { name: "Pulp Fiction", director: "Quentin Tarantino" }]
      );
    });

    it("Reusability: The original MovieLister is reused when movies are provided by a component with \
              its own dependencies", () => {
      // This component returns a canned list of movies depending on whether the given number is odd
      // or even. Therefore, it has a single dependency.
      const Finder = Brick.create({
        args: ['num'],
        // The list of movies that the lister knows about. It returns either the first one or the
        // second one depending on whether its dependency is even or odd, respectively.
        movies: [
          [ 
            {
                name: "Pulp Fiction",
                director: "Quentin Tarantino",
            },
            {
              name: "The Imitation Game",
              director: "Morten Tyldum",
            },
          ],
          [
            {
              name: "Lock, Stock and Two Smoking Barrels",
              director: "Guy Ritchie",
            },
            {
              name: "Reservoir Dogs",
              director: "Quentin Tarantino",
            },
          ],
        ],
        fn(args) {
          const idx = args.num % 2;
          return this.movies[idx];
        },
      });

      // When we compose the original MovieLister with the new `Finder`, the resulting component has
      // two dependencies: the name of the director whose movies should be listed, as well as the number
      // indicating which list should be used. The `foremanjs` framework automatically handles the
      // wiring that makes sure that the appropriate original Brick is invoked with the appropriate
      // dependencies.
      const Lister = MovieLister.compose({ movies: Finder });
      assert.deepEqual(Lister.args, ["num", "director"]);
      // even number => the first list searched:
      assert.deepEqual(
          Lister.fn({ num: 2, director: "Quentin Tarantino" }),
          [ { name: "Pulp Fiction", director: "Quentin Tarantino" }]
      );
      // odd number => the second list searched:
      assert.deepEqual(
          Lister.fn({ num: 3, director: "Quentin Tarantino" }),
          [ { name: "Reservoir Dogs", director: "Quentin Tarantino" }]
      );
    });

    it("Reusability: Create a component that *always* searches a list of movies, which is provided \
            asynchronously (e.g. by hitting a remote service) for Quentin Tarantino movies", (done) => {
      // Simulates an asynchronous movie finder by returning a canned list after a timeout of 1 second.
      // Conceivably, this list could have been then obtained by any sort of async operation, such as
      // a remote service request or a long-running computation...
      const AsyncMovieFinder = Brick.create({
        args: [],
        canOfMovies: [
            {
                name: "Pulp Fiction",
                director: "Quentin Tarantino",
            },
            {
              name: "The Imitation Game",
              director: "Morten Tyldum",
            },
            {
              name: "Lock, Stock and Two Smoking Barrels",
              director: "Guy Ritchie",
            },
            {
              name: "Reservoir Dogs",
              director: "Quentin Tarantino",
            },
        ],
        fn() {
          return new Eventual(new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(this.canOfMovies);
            }, 100);
          }));
        },
      });

      const AsyncTarantinoLister = MovieLister.compose({ movies: AsyncMovieFinder })
                                              .bind({ director: "Quentin Tarantino" });

      // This component no longer has any dependencies.
      assert.deepEqual(AsyncMovieFinder.args, []);
      // ...yet on every invocation, it in turn invokes the AsyncMovieFinder to obtain a list of
      // movies that it should search through for Tarantino movies.
      // Of course, the result of this component is then also available asynchronously, only after
      // the list of movies has become available. However, the original implementation of the
      // `MovieFinder` did not have to consider this at all.
      const futureMovies = AsyncTarantinoLister.fn({});
      futureMovies.then(tarantinoMovies => {
        assert.deepEqual(tarantinoMovies, [
          {
              name: "Pulp Fiction",
              director: "Quentin Tarantino",
          },
          {
              name: "Reservoir Dogs",
              director: "Quentin Tarantino",
          },
        ]);
        // Signal to mocha that the async test is done
        done();
      });
    });
  });

  // The examples here demonstrate how the Brick pattern can be used as an alternative to DI when the
  // DAO pattern is implemented.
  describe("DAO", () => {
    const ActivateUser = Brick.create({
      args: ['user'],
      fn(args) {
        args.user.setActive();

        return args.user;
      },
    });

    // Finds a user with the given ID in the given store.
    // A store can be any object that implements the pseudo-interface with methods:
    //   - `get(id) -> User`
    //   - `set(id, User)`
    //   - `has(id) -> bool`
    const ReadUserFrom = Brick.create({
      args: ['store', 'id'],
      fn(args) {
        if (args.store.has(args.id)) {
          return Option.ret(args.store.get(args.id));
        } else {
          // Indicate that there was an error reading the user...
          return Option.None;
        }
      },
    });
    // Write a given user back into a given store.
    // A store can be any object that implements the pseudo-interface with methods:
    //   - `get(id) -> User`
    //   - `set(id, User)`
    const WriteUserTo = Brick.create({
      args: ['store', 'user'],
      fn(args) {
        args.store.set(args.user.id, args.user.clone());
      },
    });

    // A simple class representing a User
    class User {
      constructor(userName, id, active=false) {
        this.active = active;
        this.userName = userName;
        this.id = id;
      }

      setActive() {
        this.active = true;
      }

      isActive() { return this.active; }

      clone() {
        return new User(this.userName, this.id, this.active);
      }
    }

    // This is the test for the actual ActivateUser functionality: wheter it correctly manipulates
    // a given domain object.
    it("Allows us to activate a User", () => {
      const user = new User("bob", 1);
      // Sanity check: The user is still not active
      assert.deepEqual(user.isActive(), false);

      const activated = ActivateUser.fn({ user: user });

      assert.deepEqual(activated.isActive(), true);
    });

    it("Composability: Allows us to create a service that first reads a user from a store, activates it, \
              and finally writes it back to a store", () => {
      // Prepare a store of users...
      const store = new Map();
      store.set(1, new User("bob", 1));
      store.set(2, new User("dave", 2));
      store.set(3, new User("kevin", 3));

      // Bind our DAO components to this concrete store...
      // This also demonstrates the reusability aspects of the foremanjs approach.
      const WriteUser = WriteUserTo.bind({ store: store });
      const ReadUser = ReadUserFrom.bind({ store: store });
      // Now create the service that will perform the actions sequentially on every invocation.
      const Service = WriteUser.compose({
        user: ActivateUser.compose({
          user: ReadUser,
        })
      });

      // The service has a single dependency now: the ID of the user that should be activated.
      assert.deepEqual(Service.args, ["id"]);
      // Invoke the service to activate Dave
      const res = Service.fn({ id: 2 });

      // Only dave is now active!
      assert.deepEqual(store.get(1).isActive(), false);
      assert.deepEqual(store.get(2).isActive(), true);
      assert.deepEqual(store.get(3).isActive(), false);
      // The result also indicated a successful completion of the operation.
      assert.deepEqual(res.isSome(), true);

      // If we try to activate a user that does not exist, we'll get an error indication in
      // the result. Moreover, none of the other steps of the service are even invoked (i.e. the
      // activation and write-back) --- the whole thing is short-circuited automatically once the
      // accessor is unable to provide a user.
      assert.deepEqual(Service.fn({ id: 100 }).isNone(), true);
    });
  });
});
