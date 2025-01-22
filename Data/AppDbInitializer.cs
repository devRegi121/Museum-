using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MuseumAPI.Data.Models;
using System;
using System.Linq;

namespace MuseumAPI.Data
{
    public class AppDbInitializer
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<AppDbContext>();

                
                if (!context.Artists.Any())
                {
                    context.Artists.AddRange(
                        new ArtistModel
                        {
                            Name = "Vincent Van Gogh",
                            Description = "Vincent Willem van Gogh was a Dutch post-impressionist painter who is among the most famous and influential figures in the history of Western art. He is a talented artist known for unique abstract expressions and vibrant colors.",
                            ImageUrl = "images/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg"
                        },
                        new ArtistModel
                        {
                            Name = "Johannes Vermeer",
                            Description = "An innovative artist blending classical techniques with modern styles.",
                            ImageUrl = "images/Johannes-Vermeer-Self-Portrait-1654-1241569538.jpg"
                        },
                        new ArtistModel
                        {
                            Name = "Caspar David Friedrich",
                            Description = "Known for their stunning landscapes and detailed portrayals of nature.",
                            ImageUrl = "images/Caspar+David+Friedrich+-+Portrait+of+Caspar+David+Friedrich+-+(MeisterDrucke-23607)-3038130751.jpg"
                        },
                        new ArtistModel
                        {
                            Name = "Claude Monet",
                            Description = "Oscar-Claude Monet was a French painter, a founder of French Impressionist painting and the most consistent and prolific practitioner of the movement's philosophy of expressing one's perceptions before nature, especially as applied to plein air landscape painting.",
                            ImageUrl = "images/Claude_Monet_1899_Nadar_crop.jpg"
                        }
                    );

                    context.SaveChanges();
                }

                
                if (!context.Paintings.Any())
                {
                    context.Paintings.AddRange(
                        new PaintingsModel
                        {
                            ArtistId = 1,
                            Name = "Flower Beds in Holland",
                            Description = "Flower Beds in Holland was Van Gogh's first garden painting, in oil paint on canvas mounted on wood.",
                            theme = "Nature",
                            price = 1000,
                            isSold = false,
                            ImageUrl = "images/flowerbeds.jpeg"
                        },
                        new PaintingsModel
                        {
                            ArtistId = 1,
                            Name = "Green Wheat Fields",
                            Description = "An oil-on-canvas painting by Dutch Post-Impressionist Vincent van Gogh.",
                            theme = "Nature",
                            price = 3000,
                            isSold = false,
                            ImageUrl = "images/greenWheat.jpg"
                        }
                    );

                    context.SaveChanges();
                }


                if (!context.Gifts.Any())
                {
                    context.Gifts.AddRange(
                        new GiftsModel
                        {
                            Name = "Starry Night Key Chain",
                            Price = 5,
                            Code = 1687,
                            Url = "images/keyChain.webp"
                        },
                        new GiftsModel
                        {
                            Name = "Notebook",
                            Price = 15,
                            Code = 1236,
                            Url = "images/notebook.jpg"
                        },
                         new GiftsModel
                         {
                             Name = "Gift Set",
                             Price = 40,
                             Code = 1102,
                             Url = "images/giftSet.webp"
                         },
                          new GiftsModel
                          {
                              Name = "Magnet Set",
                              Price = 10,
                              Code = 4601   ,
                              Url = "images/MagnetSet.webp"
                          },
                           new GiftsModel
                           {
                               Name = "Water Bottle",
                               Price = 15,
                               Code = 1106,
                               Url = "images/waterBootle.webp"
                           }
                    );
                    context.SaveChanges();
                }
               


                try
                {
                    if (!context.Users.Any())
                    {
                        context.Users.AddRange(
                            new UserModel
                            {
                                Username = "admin",
                                Email = "admin@gmail.com",
                                Password = BCrypt.Net.BCrypt.HashPassword("admin123"),
                                FirstName = "Admin",
                                LastName = "1",
                                PhoneNumber = "1234567890",
                                Address = "Durres",
                                City = "Durres",
                                Country = "Albania",
                                ZipCode = "2001",
                                Role = "Admin"
                            }
                        );
                        context.SaveChanges();
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error seeding users: " + ex.Message);
                }
            }
        }
    }
}
