# Geração dos arquivos separados pelas iniciais
import pandas as pd
import unidecode as ud

# Carregamento da base
df_movies = pd.read_csv(r'data\rotten_tomatoes_movies.csv')

# Tratamento do nome dos filmes
df_movies['movie_title'] = df_movies['movie_title'].transform(lambda x: ud.unidecode(x))
df_movies['movie_title'] = df_movies['movie_title'].transform(lambda x: x.replace('!', ''))
df_movies['movie_title'] = df_movies['movie_title'].transform(lambda x: x.replace('?', ''))
df_movies['movie_title'] = df_movies['movie_title'].transform(lambda x: x.replace('#', ''))
df_movies['movie_title'] = df_movies['movie_title'].transform(lambda x: x.replace('$', ''))
df_movies['movie_title'] = df_movies['movie_title'].transform(lambda x: x.replace('(', ''))
df_movies['movie_title'] = df_movies['movie_title'].transform(lambda x: x.replace(')', ''))
df_movies['movie_title'] = df_movies['movie_title'].transform(lambda x: x.replace('[', ''))
df_movies['movie_title'] = df_movies['movie_title'].transform(lambda x: x.replace(']', ''))
df_movies['movie_title'] = df_movies['movie_title'].transform(lambda x: x.replace('*', ''))
df_movies['movie_title'] = df_movies['movie_title'].transform(lambda x: x.replace('.', ''))
df_movies['movie_title'] = df_movies['movie_title'].transform(lambda x: x.replace(':', ''))
df_movies['movie_title'] = df_movies['movie_title'].transform(lambda x: x.replace(';', ''))
df_movies['movie_title'] = df_movies['movie_title'].transform(lambda x: x.replace("'", ''))
df_movies['movie_title'] = df_movies['movie_title'].transform(lambda x: x.replace('"', ''))
df_movies['movie_title'] = df_movies['movie_title'].transform(lambda x: x.lstrip())
df_movies['movie_title'] = df_movies['movie_title'].transform(lambda x: x.rstrip())
df_movies['movie_title'] = df_movies['movie_title'].transform(lambda x: x.lower())
df_movies['movie_title'] = df_movies['movie_title'].transform(lambda x: x.title())

# Ordenando filmes 
df_movies.sort_values('movie_title', inplace=True)

# Separando e gerando arquivos baseado na inicial do filme
df_movies['inicial'] = df_movies['movie_title'].transform(lambda x: x[0])
df_movies[df_movies['inicial'].isin(['T'])].to_csv(f'data/T.csv', index=False)
df_movies[df_movies['inicial'].isin(['A', 'S'])].to_csv(f'data/AS.csv', index=False)
df_movies[df_movies['inicial'].isin(['B', 'M', 'H'])].to_csv(f'data/BMH.csv', index=False)
df_movies[df_movies['inicial'].isin(['L', 'D', 'C'])].to_csv(f'data/LDC.csv', index=False)
df_movies[df_movies['inicial'].isin(['F', 'I', 'P', 'W', 'R'])].to_csv(f'data/FIPWR.csv', index=False)
df_movies[df_movies['inicial'].isin(
  ['+','7','8','6','9','5','4','X','3','Q','Z','2','1','Y','U','V','K','O','J','N','E','G']
  )].to_csv(f'data/+123456789XQZYUVKOJNEG.csv', index=False)

# Geração da lista dos fimes presentes na base de dados
movies = pd.DataFrame(df_movies.movie_title.unique())
movies.sort_values(0, inplace=True)
movies.to_csv(r'data\movies_list.csv', index=False)