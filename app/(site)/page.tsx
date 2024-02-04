import Header from "../components/Header";
import PageContent from "./components/PageContent";
// import Session from "./components/Session";

export default function Home() {
  return (
    <div className='
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    '>
      <Header>
        <div className="mb-2">
        <h1
          className="text-white text-3xl font-semibold"
        >
          De volta às atividades!
        </h1>
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2xl:grid-cols3
            2xl:grid-cols-4
            gap-3
            mt-4
          "
        >

        </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            Novos Quizzes
          </h1>
        </div>
       <PageContent />
      </div>
    </div>
  )
}
