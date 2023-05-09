import Poste from './Poste';

export default function PosteList({ postes, updatePosts }) {
  return (
    <>
      {postes.map((poste, index) => (
        <Poste
          key={index}
          title={poste.title}
          content={poste.content}
          description={poste.description}
          groupe={poste.group}
          img={poste.img}
          datePublished={poste.datePublished}
          dateEnd={poste.dateEnd}
          nbrVue={poste.nbrVue}
          name="Tom Baillet"
          username="@Youbuze"
          yesPercent={10}
          noPercent={50}
          otherPercent={40}
          nbLike={10}
          nbComment={poste.comments.length}
          updatePosts={() => typeof updatePosts == 'function' && updatePosts()}
        />
      ))}
    </>
  );
}
