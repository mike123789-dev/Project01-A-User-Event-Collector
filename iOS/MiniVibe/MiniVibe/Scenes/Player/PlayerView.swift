//
//  PlayerView.swift
//  MiniVibe
//
//  Created by 강병민 on 2020/11/28.
//

import SwiftUI

struct PlayerView: View {
    @ObservedObject var viewModel: PlayerViewModel
    @Binding var showMediaPlayer: Bool
    @State var timeDuration = Float(180)
    
    var body: some View {
        GeometryReader { geometry in
            ScrollView(.vertical, showsIndicators: false) {
                VStack(spacing: 10) {
                    PlayerHeaderView(showMediaPlayer: $showMediaPlayer)
                    PlayerInfoView(track: viewModel.currentTrack, timeDuration: $timeDuration)
                    PlayerControlView(viewModel: viewModel)
                }
                .padding(.horizontal, 20)
                .padding(.bottom, geometry.safeAreaInsets.bottom)
                .frame(height: geometry.size.height)
                
                LazyVGrid(columns: [GridItem(.flexible())]) {
                    ForEach(viewModel.queue) { track in
<<<<<<< HEAD
                        TrackCellView(hasAccessory: true, track: track)                    }
=======
                        TrackCellView(hasAccessory: true, track: track)
                    }
>>>>>>> 24a78041855f0f9f610ea513ca58dc48daa0e1fa
                    Rectangle()
                        .clearBottom()
                }
                .padding(.horizontal, 20)
                
            }
            .background(Color(UIColor.systemBackground))
            .preferredColorScheme(.dark)
        }
        .edgesIgnoringSafeArea(.bottom)
    }
}

struct PlayerHeaderView: View {
    @Binding var showMediaPlayer: Bool
    
    var body: some View {
        HStack {
            Image(systemName: "flame")
                .accesoryModifier(color: .secondary, size: .medium)
            Spacer()
            Text("플레이리스트 제목")
            Spacer()
            Button(action: {
                showMediaPlayer.toggle()
            }, label: {
                Image(systemName: "chevron.down")
                    .accesoryModifier(color: .secondary, size: .medium)
                
            })
        }
    }
}

struct PlayerInfoView: View {
    let track: Track
    @Binding var timeDuration: Float
    
    var body: some View {
        VStack(spacing: 40) {
<<<<<<< HEAD
            AsyncImage(url: URL(string: track.album?.cover ?? ""))
                .padding()
=======
            //            AsyncImage(url: URL(string: track.album?.cover ?? ""))
            //                .padding()
>>>>>>> 24a78041855f0f9f610ea513ca58dc48daa0e1fa
            HStack {
                VStack(alignment: .leading, spacing: 10) {
                    Text(track.name)
                        .font(.system(size: 24, weight: .bold))
                    Text(track.artists?.first?.name ?? "")
                        .font(.system(size: 18, weight: .light))
                        .foregroundColor(.secondary)
                }
                Spacer()
                Image(systemName: "ellipsis")
                    .accesoryModifier(color: .gray, size: .medium)
            }
            Slider(value: $timeDuration)
                .padding(.bottom, 20.0)
                .accentColor(.red)
        }
    }
}

struct PlayerControlView: View {
    @ObservedObject var viewModel: PlayerViewModel
    
    var body: some View {
        VStack {
            HStack {
                Button(action: {}, label: {
                    Image(systemName: "repeat")
                        .accesoryModifier(color: .gray, size: .medium)
                })
                .accentColor(.primary)
                Spacer()
                Button(action: {}, label: {
                    Image(systemName: "paperplane")
                        .accesoryModifier(color: .gray, size: .large)
                    //                        .font(Font.title.weight(.light))
                })
                .accentColor(.primary)
                Spacer()
                Button(action: {}, label: {
                    Image(systemName: "play")
                        .accesoryModifier(color: .primary, size: .large)
                        .font(Font.title.weight(.light))
                })
                .accentColor(.primary)
                Spacer()
                
                Button(action: {}, label: {
                    Image(systemName: "heart")
                        .accesoryModifier(color: .red, size: .large)
                })
                .accentColor(.red)
                Spacer()
                
                Button(action: {}, label: {
                    Image(systemName: "shuffle")
                        .accesoryModifier(color: .gray, size: .medium)
                })
                .accentColor(.primary)
                
            }
            .padding(.vertical, 10)
            HStack(alignment: .bottom) {
                Button(action: {
                    print(viewModel.queue)
                }, label: {
                    Image(systemName: "airplayaudio")
                        .accesoryModifier(color: .gray, size: .medium)
                })
                
                Spacer()
                Text("미리듣기 중")
                    .foregroundColor(.red)
                Spacer()
                Button(action: {
                    print(viewModel.queue)
                }, label: {
                    Image(systemName: "music.note.list")
                        .accesoryModifier(color: .gray, size: .medium)
                })
            }
            .padding(.top, 20)
            .padding(.bottom, 10)
        }
    }
    
}

struct PlayerView_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            PlayerView(viewModel: PlayerViewModel(), showMediaPlayer: .constant(true))
                .colorScheme(.dark)
            //작은 화면 프리뷰
            PlayerView(viewModel: PlayerViewModel(), showMediaPlayer: .constant(true))
                .previewDevice("iPhone 8")
        }
    }
}
